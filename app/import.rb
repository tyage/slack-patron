require './lib/slack_import'

exported_file = ARGV[0]
SlackImport.new.import_from_file(exported_file)
