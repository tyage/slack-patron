FROM python:3.5.2-slim

RUN pip install 'mongo-connector[elastic5]' 'elastic2-doc-manager[elastic5]'

RUN mkdir /conf && mkdir /var/log/mongo-connector
COPY ./config.json /conf/

CMD ["mongo-connector", "-c", "/conf/config.json"]
