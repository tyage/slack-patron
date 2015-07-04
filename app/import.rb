require './lib/slack_import'

slack_import = SlackImport.new
exported_file = ARGV[0]
slack_import.import_from_file(exported_file)
slack_import.thread.join
