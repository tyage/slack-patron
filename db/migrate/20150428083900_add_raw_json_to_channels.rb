class AddRawJsonToChannels < ActiveRecord::Migration
  def change
    change_table :channels do |t|
      t.text :raw_json
    end
  end
end
