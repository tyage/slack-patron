FROM alpine:3.9

RUN apk add --update python3 py3-pip mongodb bash curl && \
	python3 -m pip install 'mongo-connector[elastic5]' 'elastic2-doc-manager[elastic5]' && \
	wget https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh && \
	chmod +x wait-for-it.sh

COPY run.sh .

CMD ./wait-for-it.sh mongo:27017 -t 0 -- ./wait-for-it.sh elasticsearch:9200 -t 0 -- bash run.sh
