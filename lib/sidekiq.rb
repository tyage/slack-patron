require 'sidekiq'
require 'sidekiq/api'
require './lib/slack_logger'
require './lib/slack_import'

config = YAML.load_file('./config.yml')

Sidekiq.configure_server do |c|
  c.redis = config['redis']
end
Sidekiq.configure_client do |c|
  c.redis = config['redis']
end

class LoggerWorker
  include Sidekiq::Worker

  def perform
    # ensure the single worker is running
    unless already_started?
      SlackLogger.new.start
    end
  end

  def already_started?
    return Sidekiq::Workers.new.select { |process_id, thread_id, work|
      work['payload']['class'] == 'LoggerWorker' and work['payload']['jid'] != jid
    }.length > 0
  end
end

class ImportWorker
  include Sidekiq::Worker

  def perform(exported_file)
    slack_import = SlackImport.new
    slack_import.import_from_file(exported_file)
  end
end
