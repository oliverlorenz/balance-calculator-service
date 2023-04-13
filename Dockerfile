FROM docker.io/node:lts-alpine
LABEL org.opencontainers.image.source https://github.com/oliverlorenz/discord-event-scheduler
WORKDIR /app

RUN addgroup --system discord-event-scheduler && \
    adduser --system -G discord-event-scheduler discord-event-scheduler

COPY dist dist
RUN chown -R discord-event-scheduler:discord-event-scheduler .

CMD [ "node", "dist" ]