require 'sidekiq'
require 'sidekiq/web'
require './viewer/viewer'

config = YAML.load_file('./config.yml')

run Rack::URLMap.new(
  '/' => Sinatra::Application,
  '/sidekiq' => Sidekiq::Web
)
