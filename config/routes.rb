Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check
  root to: 'root#root'
  # Defines the root path route ("/")
  # root "posts#index"
  namespace :api, defaults: { format: :json } do
    resources :users, only: %i[create show] do
      resources :posts, only: %i[create index]
      resources :friendships, only: %i[create index]
    end
    resources :photos, only: [:create]

    resources :posts, only: [] do
      resources :comments, only: %i[create index]
      resources :likes, only: %i[create index destroy]
    end

    resources :comments, only: [] do
      resources :likes, only: %i[create index destroy]
    end

    resources :friendships, only: [] do
      member do
        patch :accept
        delete :destroy
      end
    end

    resource :authentications, only: %i[create destroy]
  end
end
