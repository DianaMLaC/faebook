class RenameColumnInIntro < ActiveRecord::Migration[7.1]
  def change
    rename_column :intros, :zodiac_sign, :zodiac
  end
end
