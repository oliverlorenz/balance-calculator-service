import {
  Client,
  GuildScheduledEventEntityType,
  GuildScheduledEventPrivacyLevel,
  IntentsBitField,
} from "discord.js";
import moment from "moment";
import { load } from "ts-dotenv";

const env = load({
  DISCORD_TOKEN: String,
  DISCORD_GUILD_ID: String,
  DISCORD_EVENT_CHANNEL_ID: String,
  ADD_NUMBER: Number,
  ADD_UNIT: String,
  DURATION_ADD_NUMBER: Number,
  DURATION_ADD_UNIT: String,
  DISCORD_EVENT_NAME: String,
  DISCORD_EVENT_DESCRIPTION: {
    default: "",
    type: String,
  },
});

(async () => {
  const client = new Client({
    intents: [IntentsBitField.Flags.GuildScheduledEvents],
  });
  await new Promise((resolve) => {
    client.on("ready", resolve);
    client.login(env.DISCORD_TOKEN);
  });
  console.log(`Logged in as ${client.user?.username}!`);

  const guild = client.guilds.cache.get(env.DISCORD_GUILD_ID);
  // @ts-ignore
  const startDate = moment().add(env.ADD_NUMBER, env.ADD_UNIT);

  // @ts-ignore
  const endDate = moment(startDate).add(
    env.DURATION_ADD_NUMBER,
    env.DURATION_ADD_UNIT
  );

  const options = {
    entityType: GuildScheduledEventEntityType.Voice,
    privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
    scheduledStartTime: startDate.toDate(),
    scheduledEndTime: endDate.toDate(),
    channel: env.DISCORD_EVENT_CHANNEL_ID,
    name: env.DISCORD_EVENT_NAME,
    description: env.DISCORD_EVENT_DESCRIPTION,
  };

  await guild?.scheduledEvents.create(options);
  console.log("done");
  process.exit(0);
})();
