require 'sinatra'
require './lib/slack'
require './lib/db'

def members
  hashed_members = {}
  User.all.each do |m|
    hashed_members[m.slack_id] = m
  end
  hashed_members
end

def channels
  hashed_channels = {}
  Channel.all.each do |c|
    hashed_channels[c.slack_id] = c
  end
  hashed_channels
end

def messages(channel)
  Message.where(channel: channel).order(posted_at: :desc)
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

post '/messages/:channel.json' do
  content_type :json
  messages(params[:channel])
    .limit(params[:limit] || 100)
    .where('posted_at < ?', params[:min_posted_at] || Time.now)
    .reverse
    .to_json
end
