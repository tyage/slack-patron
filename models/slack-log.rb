class SlackLog < ActiveRecord::Base
  validates :ts, uniqueness: true
end
