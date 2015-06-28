# Copyright 2015 Towry Wang

require "bundler"
Bundler.require
require './config/environments'
require './models/all'

CODES = {
  :login_required => 1,
  :success => 200,
  :fail => 400
}

MESSAGES = {
  :login_required => "You need to login to process the action",
  :success => "success",
  :fail => "Bad request"
}

module Sinatra
  module Helpers
    def current_user
      @current_user ||= User.find_by(id: session[:user])
    end

    def login_required
      user = current_user
      return true if user 
      
      session[:return_to] = request.fullpath
      redirect "/api/system/message?code=#{__method__}"
      return false
    end

    def resp_payload(code = -1, message = '', others = {})
      if not code
        code = -1
      end

      load = {
        :code => code,
        :message => message
      }

      return load.merge others
    end
  end
end

module Pgtd
  class App < Sinatra::Base

    # Helpers
    # helpers Sinatra::Helpers

    # Settings
    set :session_secret, "ja23jk$j8jdfSw"
    enable :sessions
    use Rack::Session::Pool, :expire_after => 2592000

    # Omniauth configure
    use OmniAuth::Builder do
      if App.development?
        opts = {
          :provider_ignores_state => true
        }
      else
        opts = nil
      end
      provider :github, ENV['GITHUB_KEY'], ENV['GITHUB_SECRET'], opts
    end

    # Before middleware
    before do 
      cache_control :public, :must_revalidate, :max_age => 60
    end

    # Routes
    get '/' do
      slim :index
    end

    # Api for login etc.
    get '/login' do 
      redirect to('/auth/github'), 303
    end

    get '/auth/github/callback' do 
      auth = request.env['omniauth.auth']
      user = User.from_omniauth(auth)

      @current_user = user
      session[:user] = user.id

      redirect to('/'), 303
    end

    # Api for manipulating boards
    get '/api/board/create' do 
      content_type :json 
      login_required

      name = params['name']
      board = Board.create name
      board.to_json
    end

    get '/api/board/fetch_one' do 
      content_type :json 

      id = params['id']
      if not id 
        return resp_payload(CODES[:fail], MESSAGES[:fail]).to_json
      end
      begin
        board = Board.find(id)
        lists = List.all().where(lists: {board_id: id})
        
        return resp_payload(CODES[:success], MESSAGES[:success], {
          data: {
            board: board.to_json,
            lists: lists.to_json
          }
        }).to_json
      rescue ActiveRecord::RecordNotFound => e 
        return resp_payload(404, "Not found").to_json
      end
    end

    get '/api/board/fetch_all' do 
      content_type :json 

      start = params['start'] || 0
      count = params['count'] || 20

      if start < 0 
        start = 0
        count = 20
      end
      if count < 20 or count > 40
        count = 20
      end
      begin
        boards = Board.offset(start).limit(count).all
      rescue ActiveRecord::RecordNotFound => e 
        boards = "[]";
      end
      boards.to_json
    end

    # Return a message that from this system
    get '/api/system/message' do 
      content_type :json
      code = params['code']

      resp = resp_payload CODES[code.to_sym], MESSAGES[code.to_sym]
      resp.to_json
    end

    # Sesstion
    post '/api/session/logout' do 
      @current_user = nil 
      session[:user] = nil 

      resp_payload(CODES[:success], MESSAGES[:success]).to_json
    end

    # Api for users
    get '/api/user/login_check' do 
      u = current_user
      if not u
        res = resp_payload CODES[:success], MESSAGES[:success], {:value => false}
      else
        res = resp_payload CODES[:success], MESSAGES[:success], {:value => true}
      end
      return res.to_json
    end

    get '/api/user/info' do 
      resp_payload(CODES[:success], MESSAGES[:success], {:value => {
        name: 'Towry'
      }}).to_json
    end
  end
end
