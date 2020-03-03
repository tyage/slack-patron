FROM alpine:3.10
RUN apk add --no-cache curl

RUN addgroup -S app && adduser -S -g app app
USER app
COPY --chown=app:app ./setup.sh ./setup.sh

ENTRYPOINT ["./setup.sh"]
