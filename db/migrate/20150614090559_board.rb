class Board < ActiveRecord::Migration
  def up
    create_table :boards do |t|
      t.string :name
      t.string :creator
      t.timestamps null: true
    end
  end
  def change
    change_column :boards, :creator, :integer
  end
end
