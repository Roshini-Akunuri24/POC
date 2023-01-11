require "spec_helper"
require "action_controller"
require "models/event_spec"

describe Calendar::Event do
  describe "#date_range" do
    it "renders a full calendar month" do
      today = Date.today
      calendar = Calendar::Event.new(ViewContext.new, start_date: Date.today)

      expect(calendar.date_range.min).to be <= today.beginning_of_month
      expect(calendar.date_range.max).to be >= today.end_of_month
    end

    it "render the days of next and previous months on the edges of the calendar" do
      month = Date.new(2023, 1, 5)
      calendar = Calendar::Event.new(ViewContext.new, start_date: month)

      expect(calendar.date_range.first).to eq Date.new(2023, 1, 5)
      expect(calendar.date_range.last).to eq Date.new(2023, 2, 5)
    end
  end
end