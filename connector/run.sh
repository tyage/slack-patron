#!/bin/bash

mongo mongo:27017 <<< "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'mongo:27017'}], protocolVersion: 1}, {force: true})"
curl -XPUT 'http://elasticsearch:9200/slack_logger' -d '{
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
curl -XPUT 'http://elasticsearch:9200/slack_logger/_mapping/messages' -d '{
  "properties": {
    "text": {
      "type": "text",
      "analyzer": "kuromoji_analyzer"
    },
    "ts": {
      "type": "double"
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

mongo-connector -m mongo:27017 -t elasticsearch:9200 -d elastic2_doc_manager --stdout --continue-on-error
