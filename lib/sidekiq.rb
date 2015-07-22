require 'sidekiq'
require 'sidekiq/api'
require './lib/slack_logger'
require './lib/slack_import'

Sidekiq.configure_server do |config|
    config.redis = { url: 'redis://localhost:6379', namespace: 'sidekiq' }
end

Sidekiq.configure_client do |config|
    config.redis = { url: 'redis://localhost:6379', namespace: 'sidekiq' }
end

class LoggerWorker
  include Sidekiq::Worker

  def perform
    SlackLogger.new
  end
end

class ImportWorker
  include Sidekiq::Worker

  def perform(exported_file)
    slack_import = SlackImport.new
    slack_import.import_from_file(exported_file)
  end
end
