FROM rwynn/monstache:6.7.1

RUN apk add --no-cache bash curl && \
	wget https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh && \
	chmod +x wait-for-it.sh

COPY run.sh .
COPY monstache.toml .

ENTRYPOINT ./wait-for-it.sh mongo:27017 -t 0 -- ./wait-for-it.sh elasticsearch:9200 -t 0 -- bash run.sh
