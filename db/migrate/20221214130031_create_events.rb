class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.string :all_day
      t.datetime :starts
      t.datetime :ends
      t.string :calendar
      t.string :alert

      t.timestamps
    end
  end
end
