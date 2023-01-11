class Event < ApplicationRecord
    validates :title, :address, :all_day, :start_time, :end_time, :calendar, presence: true
end
