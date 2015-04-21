require 'sinatra'
require './slack'
require './db'

def members
  Slack.users_list
end

get '/' do
  logs = SlackLog.all
  erb :index, locals: { logs: logs, members: members['members'] }
end
