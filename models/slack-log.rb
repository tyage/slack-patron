class SlackLog < ActiveRecord::Base
  validates :ts, uniqueness: true

  def self.load_data(message)
    self.create(
      text: message['text'],
      posted_at: message['ts'].to_f,
      ts: message['ts'],
      channel: message['channel'],
      user: message['user'],
      raw_json: message.to_json
    )
  end
end
