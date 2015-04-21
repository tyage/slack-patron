require 'yaml'
require 'slack'
require './slack-log'

config = YAML.load_file('./config.yml')

Slack.configure do |c|
  c.token = config['slack']['token']
end

realtime = Slack.realtime
realtime.on :message do |mes|
  log = SlackLog.new
  log.text = mes['text']
  log.posted_at = mes['ts']
  log.channel = mes['channel']
  log.user = mes['user']
  log.save
end
realtime.start
