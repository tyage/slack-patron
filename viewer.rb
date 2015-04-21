require 'sinatra'
require './db'

get '/' do
  logs = SlackLog.all
  erb :index, locals: { logs: logs }
end
