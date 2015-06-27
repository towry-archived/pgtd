
# User model
class User < ActiveRecord::Base
  validates_format_of :email, :with => /(\A(\s*)\Z)|(\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z)/i
  validates_uniqueness_of :email
  class << self
    attr_reader :id, :username, :email
    def from_omniauth(auth)
      where(provider: auth['provider'], uid: auth['uid']).first || create_from_omniauth(auth)
    end

    def create_from_omniauth(auth)
      user = User.new do |u|
        u.provider = auth['provider']
        u.username = auth['info']['name']
        u.fullname = auth['info']['nickname']
        u.email = auth['info']['email']
        u.uid = auth['uid']
        u.save(validate: false)
      end
      user
    end
  end

  def allowed_params
  end
end

# Board model
class Board < ActiveRecord::Base 
  has_many :lists, dependent: :destroy
  validates_uniqueness_of :name, scope: :creator

  class << self
    # DANGER
    def create(name)
      uid = User.id 
      board = Board.new do |b|
        b.name = name 
        b.creator = uid
      end
      board
    end
  end
end

class List < ActiveRecord::Base
  belongs_to :boards
end
