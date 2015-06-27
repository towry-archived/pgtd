
set :root, File.expand_path('..',File.dirname(__FILE__))

# Database configure
configure :development do
  set :database, 'sqlite3:db/dev.sqlite3'
  set :show_exceptions, true
end

configure :production do 
  db = URI.parse ENV['DATABASE_URL'] || 'postgres://localhost/pgtd'

  ActiveRecord::Base.establish_connection(
    :adapter  => db.scheme == 'postgres' ? 'postgres' : db.scheme,
    :host     => db.host,
    :username => db.user,
    :password => db.password,
    :database => db.path[1..-1],
    :encoding => 'utf8'
  )
end
