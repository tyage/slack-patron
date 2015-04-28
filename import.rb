require './lib/db'
require 'zip'
require 'fileutils'

def importMessages(channel, messages)
  messages.each do |mes|
    SlackLog.create(
      text: mes['text'],
      posted_at: mes['ts'].to_f,
      ts: mes['ts'],
      channel: channel.slack_id,
      user: mes['user'],
      raw_json: mes.to_json
    )
  end
end

def importChannels(channels)
  Channel.delete_all
  channels.each do |channel|
    Channel.create(
      slack_id: channel['id'],
      name: channel['name'],
      created: channel['created'],
      creator: channel['creator'],
      is_archived: channel['is_archived'],
      raw_json: channel.to_json
    )
  end
end

def importUsers(users)
  User.delete_all
  users.each do |user|
    User.create(
      slack_id: user['id'],
      name: user['name'],
      is_bot: user['is_bot'],
      image: user['profile']['image_32'],
      raw_json: user.to_json
    )
  end
end

# format of exported file
#
# exported.zip
#
# - channels.json
# - users.json
# - channel/
#     - 2015-01-01.json

exportFile = ARGV[0]

dist = 'tmp/'
begin
  Zip::File.open(exportFile) do |zip|
    zip.each do |entry|
      entry.extract(dist + entry.to_s)
    end
    open(dist + 'channels.json') do |io|
      importChannels(JSON.load(io))
    end
    open(dist + 'users.json') do |io|
      importUsers(JSON.load(io))
    end
    zip.each do |entry|
      # channel/2015-01-01.json
      if !File.directory?(dist + entry.to_s) and entry.to_s.split('/').size > 1
        puts "import #{entry.to_s}"
        channel = Channel.where(name: entry.to_s.split('/')[0]).first
        content = JSON.load(entry.get_input_stream)
        importMessages(channel, content)
      end
    end
  end
ensure
  FileUtils.rm_r(dist)
end
