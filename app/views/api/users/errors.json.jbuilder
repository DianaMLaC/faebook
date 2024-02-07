

%i[email, first_name, last_name, password, date_of_birth].each do |symb|
  error_message = @user.errors.where(symb).map(&:full_message).join(', ')
  if error_message != '2'
    json.set! symb, error_message
  end
end
