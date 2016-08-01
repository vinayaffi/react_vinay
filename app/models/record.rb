class Record < ActiveRecord::Base
  validates :date, :amount, :title, presence: true
end
