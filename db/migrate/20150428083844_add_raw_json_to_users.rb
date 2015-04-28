class AddRawJsonToUsers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.text :raw_json
    end
  end
end
