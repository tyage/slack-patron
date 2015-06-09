# Slack patron

Log and view all Slack messages in your local server.

![http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png](http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png)

## What Slack patron do?

1. Log slack messages, channels, users in MongoDB.
  - Also, you can import all messages with "Exported data"
2. View these data in web browser.

## Requirements

- ruby: 2.1.5p273
- mongo db: 2.4.9
- node.js: v0.10.25

## Startup

Copy `config.yml.example` to `config.yml` and edit it.

```sh
$ bundle install
$ npm install
$ ./node_modules/.bin/bower install
$ mongod # you need to start mongo db server
```

## 1. Log Slack data

First, you can import all messages from "Exported data".

Second, you can log Slack messages with Slack Realtime API.

### 1.1 Import exported data

Download exports(ziped file) from `https://YOUR-TEAM.slack.com/services/export`
(This may need administrator privileges in your team!)

```sh
$ bundle exec ruby import.rb PATH_TO_ZIP_FILE
```

### 1.2 Start realtime logger

You can log messages as soon as it is posted with this command.

```sh
$ bundle exec ruby logger.rb
```

## 2. View Slack data

You can view Slack data with your web browser.

### Start data viewer

```sh
$ ./node_modules/.bin/gulp
$ bundle exec rackup
```

### Development

If you are a developer, you watch js, css as below.

```
$ ./node_modules/.bin/gulp watch
```
