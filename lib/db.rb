require 'mongo'

config = YAML.load_file('./config.yml')

db_config = config['database']
db = Mongo::Client.new([ db_config['uri'] ], database: db_config['database'])

Users = db['users']
Users.indexes.create_one({ :id => 1 }, :unique => true)
def replace_users(users)
  unless users.nil?
    ids = users.map{ |user| user['id'] }
    Users.find(id: { '$in' => ids }).delete_many
    Users.insert_many(users)
  end
end

Channels = db['channels']
Channels.indexes.create_one({ :id => 1 }, :unique => true)
def replace_channels(channels)
  unless channels.nil?
    ids = channels.map{ |channel| channel['id'] }
    Channels.find(id: { '$in' => ids }).delete_many
    Channels.insert_many(channels)
  end
end

Ims = db['ims']
Ims.indexes.create_one({ :id => 1 }, :unique => true)
def replace_ims(ims)
  unless ims.nil?
    ids = ims.map{ |im| im['id'] }
    Ims.find(id: { '$in' => ids }).delete_many
    Ims.insert_many(ims)
  end
end

Emojis = db['emojis']
Emojis.indexes.create_one({ :name => 1 }, :unique => true)
def replace_emojis(emojis)
  unless emojis.nil?
    emoji_data = emojis.map{ |name, url| { 'name' => name, 'url' => url } }
    Emojis.find(name: { '$in' => emojis.keys }).delete_many
    Emojis.insert_many(emoji_data)
  end
end

Messages = db['messages']
Messages.indexes.create_one({ :ts => 1 }, :unique => true)
def insert_message(message)
  # Message can be duplicate but dont check (to improve the speed)
  begin
    subtype = message[:subtype] || message['subtype']
    if subtype == 'message_replied'
      message_inside = message[:message] || message['message']
      unless message_inside.nil?
        message_inside['channel'] = message['channel']
        insert_message(message_inside)
      end
    else
      index = { :ts => message[:ts] || message['ts'] }
      Messages.replace_one(index, message, { :upsert => true })
    end
  rescue
  end
end
