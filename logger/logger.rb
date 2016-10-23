require './lib/sidekiq'

log_file = '../logs/sidekiq.log'
pid_file = '../pids/sidekiq.pid'

if File.exist?(pid_file)
  system('bundle', 'exec', 'sidekiqctl', 'stop', pid_file)
end

system('bundle', 'exec', 'sidekiq', '-r', './lib/sidekiq.rb', '-d', '-L', log_file, '-P', pid_file)

LoggerWorker.perform_async
