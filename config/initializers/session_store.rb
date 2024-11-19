Rails.application.config.session_store :cookie_store,
                                       key: '_faebook_session',
                                       same_site: :lax, # Works for development and most production cases
                                       secure: Rails.env.production? # Only secure in production
