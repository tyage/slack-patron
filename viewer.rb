require 'sinatra'
require './db'

get '/' do
  SlackLog.all
end
