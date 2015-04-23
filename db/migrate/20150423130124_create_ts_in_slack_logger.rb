class CreateTsInSlackLogger < ActiveRecord::Migration
  def change
    add_column :slack_logs, :ts, :string
  end
end
