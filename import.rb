require './lib/db'
require 'zip'
require 'fileutils'

exportFile = ARGV[0]

def importJson(channel, content)
  JSON.parse(content).each do |mes|
    SlackLog.create(
      text: mes['text'],
      posted_at: mes['ts'].to_f,
      ts: mes['ts'],
      channel: channel['id'],
      user: mes['user']
    )
  end
end

dist = 'tmp/'
begin
  Zip::File.open(exportFile) do |zip|
    zip.each do |entry|
      entry.extract(dist + entry.to_s)
    end
    open(dist + 'channels.json') do |io|
      channels = JSON.load(io)
      zip.each do |entry|
        if !File.directory?(dist + entry.to_s) and entry.to_s.split('/').size > 1
          puts "import #{entry.to_s}"
          channel = channels.find do |c|
            entry.to_s.split('/')[0] == c['name']
          end
          content = entry.get_input_stream.read
          importJson(channel, content)
        end
      end
    end
  end
ensure
  FileUtils.rm_r(dist)
end
