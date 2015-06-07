require 'yaml'
require './viewer'

config = YAML.load_file('./config.yml')

run Sinatra::Application
