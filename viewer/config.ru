require 'sidekiq'
require 'sidekiq/web'
require './viewer/viewer'

run Rack::URLMap.new(
  '/' => Sinatra::Application,
  '/sidekiq' => Sidekiq::Web
)
