require 'sinatra'
require './lib/slack'
require './lib/db'

def members
  hashed_members = {}
  Slack.users_list['members'].each do |m|
    hashed_members[m['id']] = m
  end
  hashed_members
end

def channels
  hashed_channels = {}
  Slack.channels_list['channels'].each do |c|
    hashed_channels[c['id']] = c
  end
  hashed_channels
end

def logs
  hashed_logs = {}
  SlackLog.all.order(:posted_at).each do |l|
    hashed_logs[l.channel] ||= []
    hashed_logs[l.channel] << l
  end
  hashed_logs
end

get '/' do
  erb :index
end

get '/members.json' do
  content_type :json
  members.to_json
end

get '/channels.json' do
  content_type :json
  channels.to_json
end

get '/logs.json' do
  content_type :json
  logs.to_json
end
