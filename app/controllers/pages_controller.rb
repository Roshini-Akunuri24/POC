class PagesController < ApplicationController
  def home
    @events = Event.where(
      start_time: Time.now.beginning_of_month..Time.now.end_of_month
    )
  end

  def week
    @events = Event.where(
      start_time: Time.now.beginning_of_week..Time.now.end_of_week
    )
  end

  def year
    @events = Event.where(
      start_time: Date.today.beginning_of_year..Date.today.end_of_year
    )
  end
end
