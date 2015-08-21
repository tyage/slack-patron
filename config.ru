require 'sidekiq'
require 'sidekiq/web'
require './app/viewer'

config = YAML.load_file('./config.yml')

Sidekiq::Web.use Rack::Session::Cookie, :secret => config['rack']['secret']
Sidekiq::Web.instance_eval { @middleware.reverse! }

run Rack::URLMap.new(
  '/' => Sinatra::Application,
  '/sidekiq' => Sidekiq::Web
)
