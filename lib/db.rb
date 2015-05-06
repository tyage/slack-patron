require 'mongo'

config = YAML.load_file('./config.yml')

db_config = config['database']['development']
db = Mongo::Client.new([ db_config['uri'] ], database: db_config['database'])

Users = db['users']
Users.indexes.create_one({ :id => 1 }, :unique => true)

Channels = db['channels']
Channels.indexes.create_one({ :id => 1 }, :unique => true)

Messages = db['messages']
Messages.indexes.create_one({ :ts => 1 }, :unique => true)
def insert_message(message)
  begin
    Messages.insert_one(message)
  rescue
  end
end
