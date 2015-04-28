class AddRawJsonToLogs < ActiveRecord::Migration
  def change
    change_table :slack_logs do |t|
      t.text :raw_json
    end
  end
end
