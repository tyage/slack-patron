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

def logs(channel)
  SlackLog.where(channel: channel).order(posted_at: :desc)
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

post '/logs/:channel.json' do
  content_type :json
  params[:limit] ||= 100
  params[:min_posted_at] ||= Time.now
  logs(params[:channel])
    .limit(params[:limit])
    .where('posted_at < ?', params[:min_posted_at])
    .reverse
    .to_json
end
