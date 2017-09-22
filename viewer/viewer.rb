require 'sinatra'
require 'json'
require './lib/slack_import'
require './lib/slack'
require './lib/db'

config = YAML.load_file('./config.yml')

configure do
  set :absolute_redirects, false
  set :prefixed_redirects, true
end

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

def ims
  hashed_users = users
  hashed_ims = {}
  Ims.find.each do |c|
    hashed_ims[c[:id]] = c
    hashed_ims[c[:id]][:name] = hashed_users[c[:user]][:name]
  end
  hashed_ims.sort_by {|k, v| v[:name] }.to_h
end

def messages(params)
  limit = params[:limit] || 100
  condition = {
    ts: { '$lt' =>  params[:min_ts] || Time.now.to_i.to_s },
    hidden: { '$ne' => true }
  }
  condition[:channel] = params[:channel] unless params[:channel].nil?
  condition['$or'] = [
    # normal message
    { text: Regexp.new(params[:search]) },
    # bot message
    {
      attachments: {
        '$elemMatch' => { text: Regexp.new(params[:search]) }
      },
      subtype: 'bot_message'
    }
  ] unless params[:search].nil?

  all_messages = Messages
    .find(condition)
    .sort(ts: -1)
    .limit(limit + 1)
  has_more_message = all_messages.count > limit

  return all_messages.limit(limit), has_more_message
end

get '/users.json' do
  content_type :json
  users.to_json
end

get '/channels.json' do
  content_type :json
  channels.to_json
end

get '/ims.json' do
  content_type :json
  ims.to_json
end

post '/messages/:channel.json' do
  all_messages, has_more_message = messages(
    channel: params[:channel],
    min_ts: params[:min_ts]
  )

  content_type :json
  {
    messages: all_messages.to_a.reverse,
    has_more_message: has_more_message
  }.to_json
end

get '/team.json' do
  content_type :json
  # TODO: cache in redis or mongodb or in memory?
  Slack.team_info['team'].to_json
end

post '/import_backup' do
  exported_file = '/tmp/slack_export.zip'
  FileUtils.move(params[:file][:tempfile], exported_file)
  # TODO: show progress when import
  SlackImport.new.import_from_file(exported_file)
end

get '/' do
  hashed_channels = channels
  default_channel, _ = hashed_channels.find do |id, channel|
    channel[:name] == config['default_channel']
  end
  if default_channel.nil?
    default_channel, _ = hashed_channels.first
  end
  redirect("/#{default_channel || 'CHANNELS_NOT_FOUND'}")
end

get '/:channel' do
  erb :index
end

post '/search' do
  all_messages, has_more_message = messages(
    search: params[:word],
    min_ts: params[:min_ts]
  )

  content_type :json
  {
    messages: all_messages.to_a.reverse,
    has_more_message: has_more_message
  }.to_json
end
