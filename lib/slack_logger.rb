require './lib/slack'
require './lib/db'

class SlackLogger
  def update_users
    users = Slack.users_list['members']
    replace_users(users)
  end

  def update_channels
    channels = Slack.channels_list['channels']
    replace_channels(channels)
  end

  def update_groups
    groups = Slack.groups_list['groups']
    replace_channels(groups)
  end

  def update_ims
    ims = Slack.im_list['ims']
    replace_ims(ims)
  end

  # log history messages
  def fetch_history(target, channel)
    messages = Slack.send(
      target,
      channel: channel,
      count: 1000,
    )['messages']

    unless messages.nil?
      messages.each do |m|
        m['channel'] = channel
        insert_message(m)
      end
    end
  end

  # realtime events
  def log_realtime
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
      puts "channel has renamed"
      update_channels
    end

    realtime.on :group_joined do |c|
      puts "group has joined"
      update_groups
    end

    realtime.on :group_rename do |c|
      puts "group has renamed"
      update_groups
    end

    realtime.on :im_created do |c|
      puts "direct message has created"
      update_ims
    end

    # if connection closed, restart the realtime logger
    realtime.on :close do
      puts "websocket disconnected"
      log_realtime
    end

    realtime.start
  end

  def start
    begin
      realtime_thread = Thread.new {
        log_realtime
      }

      update_users
      update_channels
      update_groups
      update_ims

      Channels.find.each do |c|
        puts "loading messages from #{c[:name]}"
        if c[:is_channel]
          fetch_history(:channels_history, c[:id])
        elsif c[:is_group]
          fetch_history(:groups_history, c[:id])
        end
        sleep(1)
      end

      Ims.find.each do |i|
        fetch_history(:im_history, i[:id])
        sleep(1)
      end

      # realtime event is joined and dont exit current thread
      realtime_thread.join
    ensure
      realtime_thread.kill
    end
  end
end
