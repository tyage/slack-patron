require 'active_record'
require './models/slack-log'

config = YAML.load_file('./config.yml')

ActiveRecord::Base.configurations = config['database']
ActiveRecord::Base.establish_connection(:development)
