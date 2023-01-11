class CreateSmallCalendarEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :small_calendar_events do |t|

      t.timestamps
    end
  end
end
