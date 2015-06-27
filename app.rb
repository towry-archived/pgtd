# Copyright 2015 Towry Wang

require "bundler"
Bundler.require
require './config/environments'
require './models/all'

CODES = {
  :login_required => 1,
  :success => 200
}

MESSAGES = {
  :login_required => "You need to login to process the action",
  :success => "success"
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

    # Api for creating board
    get '/api/board/create' do 
      content_type :json 
      login_required

      name = params['name']
      board = Board.create name
      board.to_json
    end

    # Return a message that from this system
    get '/api/system/message' do 
      content_type :json
      code = params['code']

      resp = resp_payload CODES[code.to_sym], MESSAGES[code.to_sym]
      resp.to_json
    end

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
        name: 'Towry',
        age: 23
      }}).to_json
    end
  end
end
