# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150614090559) do

  create_table "boards", force: :cascade do |t|
    t.string   "name"
    t.string   "creator"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "lists", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "board"
    t.boolean  "checked"
    t.datetime "due"
    t.integer  "assigner"
    t.text     "description"
  end

  create_table "users", force: :cascade do |t|
    t.string   "uid"
    t.string   "username"
    t.string   "fullname"
    t.string   "email"
    t.string   "provider"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
