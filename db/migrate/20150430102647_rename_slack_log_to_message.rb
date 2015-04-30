class RenameSlackLogToMessage < ActiveRecord::Migration
  def change
    rename_table :slack_logs, :messages
  end
end
