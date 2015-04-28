class CreateChannels < ActiveRecord::Migration
  def change
    create_table :channels do |t|
      t.string :slack_id
      t.string :name
      t.datetime :created
      t.string :creater
      t.boolean :is_archived
    end
  end
end
