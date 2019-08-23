#!/bin/bash

echo "hello"

sleep 40

mongo-connector -c /conf/config.json

cat /var/log/mongo-connector/mongo-connector.log
