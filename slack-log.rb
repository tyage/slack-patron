require 'active_record'

config = YAML.load_file('./config.yml')

ActiveRecord::Base.configurations = config['database']
ActiveRecord::Base.establish_connection('development')

class SlackLog < ActiveRecord::Base
end
