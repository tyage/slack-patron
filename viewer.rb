require 'sinatra'
require './slack'
require './db'

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

get '/' do
  hashed_logs = {}
  logs = SlackLog.all
  logs.each do |l|
    hashed_logs[l.channel] ||= []
    hashed_logs[l.channel] << l
  end
  erb :index, locals: {
    logs: hashed_logs,
    members: members,
    channels: channels
  }
end
