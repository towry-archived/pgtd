class CreateAll < ActiveRecord::Migration

  def up
    create_table :users do |t|
      t.string :uid
      t.string :username
      t.string :fullname
      t.string :email
      t.string :provider
      t.timestamps null: true
    end
  end

  def down
    drop_table :users
  end
end
