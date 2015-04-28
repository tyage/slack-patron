class RenameCreaterOfChannels < ActiveRecord::Migration
  def change
    rename_column(:channels, :creater, :creator)
  end
end
