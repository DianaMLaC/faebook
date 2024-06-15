class ChangeColumnsForIntro < ActiveRecord::Migration[7.1]
  def change
    rename_column :intros, :work, :house
    rename_column :intros, :relationship, :elements

    add_column :intros, :zodiac_sign, :string
    add_column :intros, :order, :string
  end
end
