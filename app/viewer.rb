require 'sinatra'
require 'json'
require './lib/slack'
require './lib/db'
require './lib/slack_logger'

slack_logger = SlackLogger.new

def users
  hashed_users = {}
  Users.find.each do |u|
    hashed_users[u[:id]] = u
  end
  hashed_users
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

get '/users.json' do
  content_type :json
  users.to_json
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

get '/team.json' do
  content_type :json
  Slack.team_info['team'].to_json
end

post '/stop_logger' do
  slack_logger.stop
end

post '/start_logger' do
  slack_logger.start
end

get '/logger_status' do
  content_type :json
  slack_logger.working?.to_json
end

get '/' do
  if request.path_info === '' then
    return redirect to('./')
  end
  erb :index
end

get '/:channel' do
  erb :index
end
