require './lib/slack'
require './lib/db'

# users
def update_users
  User.delete_all
  Slack.users_list['members'].each do |u|
    User.load_data(u)
  end
end

update_users

p 'loading users finished!'

# channels
def update_channels
  Channel.delete_all
  Slack.channels_list['channels'].each do |c|
    Channel.load_data(c)
  end
end

update_channels

p 'loading channels finished!'

# log history messages
def fetch_history(channel)
  Slack.channels_history(
    channel: channel,
    count: 1000
  )['messages'].each do |m|
    m['channel'] = channel
    message = Message.load_data(m)
  end
end

Slack.channels_list['channels'].each do |c|
  fetch_history(c['id'])
end

p 'loading messages finished!'

# realtime events
realtime = Slack.realtime

realtime.on :message do |m|
  p m
  Message.load_data(m)
end

realtime.on :team_join do |e|
  p "new user has joined"
  update_users
end

realtime.on :user_change do |e|
  p "user data has changed"
  update_users
end

realtime.on :channel_created do |c|
  p "channel has created"
  update_channels
end

realtime.on :channel_rename do |c|
  p "channel has renamed"
  update_channels
end

realtime.start
