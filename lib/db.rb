require 'mongo'

config = YAML.load_file('./config.yml')

db_config = config['database']
db = Mongo::Client.new([ db_config['uri'] ], database: db_config['database'])

Users = db['users']
Users.indexes.create_one({ :id => 1 }, :unique => true)
def replace_users(users)
  ids = users.map{ |users| users[:id] }
  Users.find(id: { '$in' => ids }).delete_many
  Users.insert_many(users)
end

Channels = db['channels']
Channels.indexes.create_one({ :id => 1 }, :unique => true)
def replace_channels(channels)
  ids = channels.map{ |channel| channel[:id] }
  Channels.find(id: { '$in' => ids }).delete_many
  Channels.insert_many(channels)
end

Messages = db['messages']
Messages.indexes.create_one({ :ts => 1 }, :unique => true)
def insert_message(message)
  begin
    Messages.insert_one(message)
  rescue
  end
end
