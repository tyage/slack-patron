class Channel < ActiveRecord::Base
  validates :slack_id, uniqueness: true

  def self.load_data(channel)
    self.create(
      slack_id: channel['id'],
      name: channel['name'],
      created: channel['created'],
      creator: channel['creator'],
      is_archived: channel['is_archived'],
      raw_json: channel.to_json
    )
  end
end
