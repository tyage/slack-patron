require 'active_record'
require './models/slack-log'
require './models/user'
require './models/channel'

config = YAML.load_file('./config.yml')

ActiveRecord::Base.configurations = config['database']
ActiveRecord::Base.establish_connection(:development)
