Rails.application.routes.draw do
  root "pages#home"

  get "/weeks", to: "pages#week"

  get "/years", to: "pages#year"

  resources :events
  resources :pages
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
