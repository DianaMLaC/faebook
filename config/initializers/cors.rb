# config/application.rb

Rails.application.configure do
  config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:3000', 'https://faebook.fly.dev'
      resource '*', headers: :any, methods: %i[get post put patch delete options head]
    end
  end

  puts 'Rack::Cors is loaded successfully'
end
