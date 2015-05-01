require './lib/slack'
require './lib/db'

def update_users
  User.delete_all
  Slack.users_list['members'].each do |u|
    User.load_data(u)
  end
end

def update_channels
  Channel.delete_all
  Slack.channels_list['channels'].each do |c|
    Channel.load_data(c)
  end
end

# realtime events
realtime_thread = Thread.new {
  realtime = Slack.realtime

  realtime.on :message do |m|
    puts m
    Message.load_data(m)
  end

  realtime.on :team_join do |e|
    puts "new user has joined"
    update_users
  end

  realtime.on :user_change do |e|
    puts "user data has changed"
    update_users
  end

  realtime.on :channel_created do |c|
    puts "channel has created"
    update_channels
  end

  realtime.on :channel_rename do |c|
    p "channel has renamed"
    update_channels
  end

  realtime.start
}

# users
update_users

puts 'loading users finished!'

# channels
update_channels

puts 'loading channels finished!'

# log history messages
def fetch_history(channel)
  latestMessage = Message.all.where(channel: channel).order(posted_at: :desc).first
  Slack.channels_history(
    channel: channel,
    count: 1000,
    oldest: latestMessage.nil? ? nil : latestMessage.posted_at
  )['messages'].each do |m|
    m['channel'] = channel
    message = Message.load_data(m)
  end
end

Slack.channels_list['channels'].each do |c|
  puts 'loading messages from ' + c['name']
  fetch_history(c['id'])
  sleep(1)
end

puts 'loading messages finished!'

# dont exit because realtime event is running

realtime_thread.join
