require 'slack-ruby-client'
require './lib/config'

config = SlackPatronConfig.config

Slack.configure do |c|
  c.token = config[:slack][:token]
end

Slack::RealTime::Client.configure do |c|
  c.start_method = :rtm_connect
  c.store_class = Slack::RealTime::Stores::Starter
end
