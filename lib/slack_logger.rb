require 'yaml'
require './lib/slack'
require './lib/db'

config = YAML.load_file('./config.yml')

class SlackLogger
  attr_reader :client

  def initialize
    @client = Slack::Web::Client.new
  end

  def is_private_channel(channel_name)
    channel_name[0] == 'G'
  end

  def is_direct_message(channel_name)
    channel_name[0] == 'D'
  end

  def update_users
    users = client.users_list['members']
    replace_users(users)
  end

  def update_channels
    channels = client.conversations_list({type: 'public_channel'})['channels']
    replace_channels(channels)
  end

  def update_emojis
    emojis = client.emoji_list['emoji'] rescue nil
    replace_emojis(emojis)
  end

  # log history messages
  def fetch_history(target, channel)
    messages = client.send(
      target,
      channel: channel,
      count: 1000,
    )['messages'] rescue nil

    unless messages.nil?
      messages.each do |m|
        m['channel'] = channel
        insert_message(m)
      end
    end
  end

  # realtime events
  def log_realtime
    realtime = Slack::RealTime::Client.new

    realtime.on :message do |m|
      if is_private_channel(m['channel'])
        next
      end
      if is_direct_message(m['channel'])
        next
      end

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
      puts "channel has renamed"
      update_channels
    end

    realtime.on :emoji_changed do |c|
      puts "emoji has changed"
      update_emojis
    end

    # if connection closed, restart the realtime logger
    realtime.on :close do
      puts "websocket disconnected"
      log_realtime
    end

    realtime.start!
  end

  def start
    begin
      realtime_thread = Thread.new {
        log_realtime
      }

      update_emojis
      update_users
      update_channels

      Channels.find.each do |c|
        puts "loading messages from #{c[:name]}"
        if c[:is_channel]
          fetch_history(:conversations_history, c[:id])
        end
        sleep(1)
      end

      # realtime event is joined and dont exit current thread
      realtime_thread.join
    ensure
      realtime_thread.kill
    end
  end
end
