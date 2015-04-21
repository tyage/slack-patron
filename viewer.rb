require 'sinatra'
require './db'

get '/' do
  SlackLog.all.length.to_s
end
