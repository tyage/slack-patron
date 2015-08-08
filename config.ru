require 'sidekiq'
require 'sidekiq/web'
require './app/viewer'

run Rack::URLMap.new(
  '/' => Sinatra::Application,
  '/sidekiq' => Sidekiq::Web
)
