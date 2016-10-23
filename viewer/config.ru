require 'sidekiq'
require 'sidekiq/web'
require './viewer/viewer'

config = YAML.load_file('./config.yml')

Sidekiq::Web.use Rack::Session::Cookie, :secret => config['rack']['secret']
# see https://github.com/mperham/sidekiq/issues/2459
Sidekiq::Web.instance_eval { @middleware.reverse! }

run Rack::URLMap.new(
  '/' => Sinatra::Application,
  '/sidekiq' => Sidekiq::Web
)
