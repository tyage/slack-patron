require './lib/db'
require 'zip'
require 'fileutils'

def importMessages(channel, messages)
  messages.each do |m|
    message = SlackLog.load_data(m);
    message.channel = channel.slack_id
  end
end

def importChannels(channels)
  Channel.delete_all
  channels.each do |channel|
    Channel.load_data(channel)
  end
end

def importUsers(users)
  User.delete_all
  users.each do |user|
    User.load_data(user)
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
        messages = JSON.load(entry.get_input_stream)
        importMessages(channel, messages)
      end
    end
  end
ensure
  FileUtils.rm_r(dist)
end
