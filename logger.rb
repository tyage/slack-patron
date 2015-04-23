require './lib/slack'
require './lib/db'

# log history
def fetch_history(channel)
  Slack.channels_history(
    channel: channel,
    count: 1000
  )['messages'].each do |mes|
    log = SlackLog.create(
      text: mes['text'],
      posted_at: mes['ts'].to_f,
      ts: mes['ts'],
      channel: channel,
      user: mes['user']
    )
  end
end

Slack.channels_list['channels'].each do |c|
  fetch_history(c['id'])
end

p 'logging history finished!'

# realtime logging
realtime = Slack.realtime
realtime.on :message do |mes|
  p mes
  SlackLog.create(
    text: mes['text'],
    posted_at: mes['ts'].to_f,
    ts: mes['ts'],
    channel: mes['channel'],
    user: mes['user']
  )
end
realtime.start
