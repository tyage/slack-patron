require 'yaml'
require './viewer'

config = YAML.load_file('./config.yml')

map (config['prefix_path'] || '/') do
  run Sinatra::Application
end
