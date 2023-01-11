class RenameColumnOfEvents < ActiveRecord::Migration[7.0]
  def change
    rename_column :events, :starts, :start_time
    rename_column :events, :ends, :end_time
    #Ex:- rename_column("admin_users", "pasword","hashed_pasword")
  end
end
