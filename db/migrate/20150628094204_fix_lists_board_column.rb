class FixListsBoardColumn < ActiveRecord::Migration
  def change
    rename_column :lists, :board, :board_id
  end
end
