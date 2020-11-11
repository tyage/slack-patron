#!/bin/bash

mongo mongo:27017 <<< "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'mongo:27017'}], protocolVersion: 1}, {force: true})"
# FIXME: We should healthcheck elasticsearch or the commands here might fail!
curl -H "Content-Type: application/json" -XPUT 'http://elasticsearch:9200/slack_logger.messages' -d '{
  "settings": {
    "index.mapping.total_fields.limit": 50000,
    "analysis": {
      "analyzer": {
        "kuromoji_analyzer": {
          "type": "custom",
          "tokenizer": "kuromoji_tokenizer",
          "filter": [
            "cjk_width",
            "lowercase"
          ]
        }
      }
    }
  }
}' -v

# `ts` property cannot be automatically detected as double datatype but long... so I manually annotate this
# `blocks` property can be either an object or text, so disable parsing to avoid conflicts
curl -H "Content-Type: application/json" -XPUT 'http://elasticsearch:9200/slack_logger.messages/_mapping' -d '{
  "properties": {
    "text": {
      "type": "text",
      "analyzer": "kuromoji_analyzer"
    },
    "ts": {
      "type": "double"
    },
    "blocks": {
      "enabled": false
    },
    "attachments": {
      "properties": {
        "ts": {
          "type": "double"
        },
        "children": {
          "properties": {
            "ts": {
              "type": "double"
            }
          }
        }
      }
    },
    "edited": {
      "properties": {
        "ts": {
          "type": "double"
        }
      }
    },
    "replies": {
      "properties": {
        "ts": {
          "type": "double"
        }
      }
    },
    "message": {
      "properties": {
        "attachments": {
          "properties": {
            "ts": {
              "type": "double"
            }
          }
        },
        "edited": {
          "properties": {
            "ts": {
              "type": "double"
            }
          }
        },
        "replies": {
          "properties": {
            "ts": {
              "type": "double"
            }
          }
        },
        "root": {
          "properties": {
            "attachments": {
              "properties": {
                "ts": {
                  "type": "double"
                }
              }
            },
            "ts": {
              "type": "double"
            }
          }
        },
        "ts": {
          "type": "double"
        }
      }
    },
    "previous_message": {
      "properties": {
        "blocks": {
          "enabled": false
        },
        "attachments": {
          "properties": {
            "ts": {
              "type": "double"
            }
          }
        },
        "edited": {
          "properties": {
            "ts": {
              "type": "double"
            }
          }
        },
        "replies": {
          "properties": {
            "ts": {
              "type": "double"
            }
          }
        },
        "root": {
          "properties": {
            "attachments": {
              "properties": {
                "ts": {
                  "type": "double"
                }
              }
            },
            "ts": {
              "type": "double"
            }
          }
        },
        "ts": {
          "type": "double"
        }
      }
    },
    "root": {
      "properties": {
        "attachments": {
          "properties": {
            "ts": {
              "type": "double"
            }
          }
        },
        "edited": {
          "properties": {
            "ts": {
              "type": "double"
            }
          }
        },
        "replies": {
          "properties": {
            "ts": {
              "type": "double"
            }
          }
        },
        "ts": {
          "type": "double"
        }
      }
    }
  }
}' -v

curl -XPOST 'http://elasticsearch:9200/slack_logger.messages/_refresh' -v

/bin/monstache -f monstache.toml
