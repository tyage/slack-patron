class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :slack_id
      t.string :name
      t.boolean :is_bot
      t.text :image
      t.string :email
    end
  end
end
