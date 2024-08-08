class AddBioColumnToIntros < ActiveRecord::Migration[7.1]
  def change
    add_column :intros, :bio, :string
  end
end
