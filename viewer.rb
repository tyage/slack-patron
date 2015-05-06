require 'sinatra'
require 'json'
require './lib/slack'
require './lib/db'

def members
  hashed_members = {}
  Users.find.each do |m|
    hashed_members[m[:id]] = m
  end
  hashed_members
end

def channels
  hashed_channels = {}
  Channels.find.sort(name: 1).each do |c|
    hashed_channels[c[:id]] = c
  end
  hashed_channels
end

def messages(params)
  Messages
    .find(
      channel: params[:channel],
      ts: { '$lt' =>  params[:min_ts] || Time.now.to_i.to_s }
    )
    .sort(ts: -1)
    .limit(params[:limit] || 100)
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
  messages(params)
    .to_a
    .reverse
    .to_json
end
