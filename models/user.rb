class User < ActiveRecord::Base
  validates :slack_id, uniqueness: true

  def self.load_data(user)
    self.create(
      slack_id: user['id'],
      name: user['name'],
      is_bot: user['is_bot'],
      image: user['profile']['image_32'],
      raw_json: user.to_json
    )
  end
end
