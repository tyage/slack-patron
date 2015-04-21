require './slack'
require './db'

realtime = Slack.realtime
realtime.on :message do |mes|
  p mes
  log = SlackLog.new
  log.text = mes['text']
  log.posted_at = mes['ts'].to_f
  log.channel = mes['channel']
  log.user = mes['user']
  log.save
end
realtime.start
