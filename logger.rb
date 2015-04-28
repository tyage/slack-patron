require './lib/slack'
require './lib/db'

# users
User.delete_all
Slack.users_list['members'].each do |u|
  User.load_data(u)
end

p 'loading users finished!'

# channels
Channel.delete_all
Slack.channels_list['channels'].each do |c|
  Channel.load_data(c)
end

p 'loading channels finished!'

# log history messages
def fetch_history(channel)
  Slack.channels_history(
    channel: channel,
    count: 1000
  )['messages'].each do |m|
    message = SlackLog.load_data(m)
    message.channel = channel
  end
end

Slack.channels_list['channels'].each do |c|
  fetch_history(c['id'])
end

p 'loading messages finished!'

# log messages in realtime
realtime = Slack.realtime
realtime.on :message do |m|
  p m
  SlackLog.load_data(m)
end
realtime.start
