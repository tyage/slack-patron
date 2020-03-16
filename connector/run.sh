#!/bin/bash

mongo mongo:27017 <<< "rs.initiate()"
curl -XPUT 'http://elasticsearch:9200/slack_logger' -d '{
  "settings": {
    "analysis": {
      "analyzer": {
        "kuromoji_analyzer": {
          "type": "custom",
          "tokenizer": "kuromoji_tokenizer"
        }
      }
    }
  },
  "mappings": {
    "messages": {
      "properties": {
        "text": {
          "type": "text",
          "analyzer": "kuromoji_analyzer"
        },
        "ts": {
          "type": "double"
        }
      }
    }
  }
}'

mongo-connector -c /conf/config.json
