class Channel < ActiveRecord::Base
  validates :slack_id, uniqueness: true
end
