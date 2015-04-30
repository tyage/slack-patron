require 'active_record'
require './models/message'
require './models/user'
require './models/channel'

config = YAML.load_file('./config.yml')

ActiveRecord::Base.configurations = config['database']
ActiveRecord::Base.establish_connection(:development)
