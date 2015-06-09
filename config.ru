require 'yaml'
require './app/viewer'

config = YAML.load_file('./config.yml')

run Sinatra::Application
