require 'yaml'
require 'slack'

config = YAML.load_file('./config.yml')

Slack.configure do |c|
  c.token = config['slack']['token']
end

realtime = Slack.realtime
realtime.on :message do |m|
  p m
end
realtime.start
