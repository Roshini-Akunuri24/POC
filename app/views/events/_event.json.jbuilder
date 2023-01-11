json.extract! event, :id, :title, :address, :all_day, :start_time, :ends_time, :calendar, :alert, :created_at, :updated_at
json.url event_url(event, format: :json)
