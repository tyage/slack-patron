require './lib/slack'
require './lib/db'

class SlackLogger
  def initialize()
    start
  end

  def update_users
    users = Slack.users_list['members']
    Users.find.delete_many
    Users.insert_many(users)
  end

  def update_channels
    channels = Slack.channels_list['channels']
    Channels.find.delete_many
    Channels.insert_many(channels)
  end

  # log history messages
  def fetch_history(channel)
    Slack.channels_history(
      channel: channel,
      count: 1000,
    )['messages'].each do |m|
      m['channel'] = channel
      insert_message(m)
    end
  end

  # realtime events
  def spawn_realtime_thread
    Thread.new {
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
  end

  def start
    begin
      realtime_thread = spawn_realtime_thread

      update_users
      update_channels

      Channels.find.each do |c|
        puts "loading messages from #{c[:name]}"
        fetch_history(c[:id])
        sleep(1)
      end

      # realtime event is joined and dont exit current thread
      realtime_thread.join
    ensure
      realtime_thread.kill
    end
  end
end
