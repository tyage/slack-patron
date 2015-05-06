require './lib/slack'
require './lib/db'

# realtimeイベントに最終取得日が上書きされないよう、先に保存しておく
channels_updated_at = {}
Channels.find.each do |c|
  last_message = Messages.find(channel: c[:id]).sort(ts: -1).to_a[0]
  channels_updated_at[c[:id]] = last_message.nil? ? nil : last_message[:ts]
end

def update_users
  Users.find.delete_many
  Users.insert_many(Slack.users_list['members'])
end

def update_channels
  Channels.find.delete_many
  Channels.insert_many(Slack.channels_list['channels'])
end

# realtime events
realtime_thread = Thread.new {
  realtime = Slack.realtime

  realtime.on :message do |m|
    puts m
    insert_message(m)
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
def fetch_history(channel, updated_at)
  Slack.channels_history(
    channel: channel,
    count: 1000,
    oldest: updated_at
  )['messages'].each do |m|
    m['channel'] = channel
    insert_message(m)
  end
end

Channels.find.each do |c|
  puts 'loading messages from ' + c[:name]
  fetch_history(c[:id], channels_updated_at[c[:id]])
  sleep(1)
end

puts 'loading messages finished!'

# dont exit because realtime event is running

realtime_thread.join
