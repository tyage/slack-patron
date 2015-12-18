require 'sinatra'
require 'json'
require './lib/sidekiq'
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

def messages(params)
  Messages
    .find(
      channel: params[:channel],
      ts: { '$lt' =>  params[:min_ts] || Time.now.to_i.to_s },
      subtype: { '$ne' => 'message_deleted' }
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

post '/import_backup' do
  exported_file = '/tmp/slack_export.zip'
  FileUtils.move(params[:file][:tempfile], exported_file)
  ImportWorker.perform_async(exported_file)
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
  word = params[:word]

  content_type :json
  Messages
    .find(
      '$or' => [
        # normal message
        { text: Regexp.new(word) },
        # bot message
        {
          attachments: {
            '$elemMatch' => { text: Regexp.new(word) }
          },
          subtype: 'bot_message'
        }
      ],
      ts: { '$lt' =>  params[:min_ts] || Time.now.to_i.to_s }
    )
    .limit(params[:limit] || 100)
    .to_a
    .reverse
    .to_json
end
