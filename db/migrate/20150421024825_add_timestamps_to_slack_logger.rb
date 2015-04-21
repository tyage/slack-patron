class AddTimestampsToSlackLogger < ActiveRecord::Migration
  def change
    change_table :slack_logs do |t|
      t.timestamps
    end
  end
end
