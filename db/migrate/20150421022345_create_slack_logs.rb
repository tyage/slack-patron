class CreateSlackLogs < ActiveRecord::Migration
  def change
    create_table :slack_logs do |t|
      t.text :text
      t.string :user
      t.string :channel
      t.datetime :posted_at
      t.timestamp
    end
  end
end
