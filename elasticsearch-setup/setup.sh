#!/bin/sh

#until $(curl -XPUT 'http://elasticsearch:9200/slack_logger' -d '{
# "settings": {
#   "index": {
#     "analysis": {
#       "tokenizer": {
#         "kuromoji_user_dict": {
#	   "type": "kuromoji_tokenizer"
#	 }
#       },
#       "analyzer": {
#         "analyzer": {
#	   "type": "custom",
#	   "tokenizer": "kuromoji_user_dict"
#         }
#       }
#     }
#   }
# }
#}' -o /tmp/output.txt); do
#  sleep 5;
#done
until $(curl -XPUT 'http://elasticsearch:9200/slack_logger' -d '{
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
       "ts": { "type": "double" }
     }
   }
 }
}' -o /tmp/output.txt); do
  sleep 5;
done

cat /tmp/output.txt
echo "done."

  

