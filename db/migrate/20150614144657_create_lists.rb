class CreateLists < ActiveRecord::Migration
  def up
    drop_table :lists, if_exists: true
    
    create_table :lists do |t|
      t.string :name
      t.timestamps null: false
      t.integer :board
      t.boolean :checked
      t.datetime :due
      t.integer :assigner
      t.text :description
    end
  end
end
