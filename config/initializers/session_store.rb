Rails.application.config.session_store :cookie_store,
                                       key: '_faebook_session', # This is the cookie key, choose a custom name for your app
                                       same_site: :none, # Required for cross-origin requests
                                       secure: Rails.env.production? # Ensures cookies are only sent over HTTPS in production
