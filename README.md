# Slack patron

Log and view all Slack messages.

PR is welcome!!

![http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png](http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png)

## What Slack patron do?

- Log slack messages, channels, users in MongoDB.
  - Also, you can import all data with backup file.
- View these data in web browser.

![https://i.gyazo.com/e38237c8ac0259b9ee0549a67a52bc64.png](https://i.gyazo.com/e38237c8ac0259b9ee0549a67a52bc64.png)

## 1. Setup

This app needs access token from Slack.

Get access token from [here](https://slack-patron.herokuapp.com/).

Then, generate `config.yml` with this command:

```sh
$ ruby ./bin/init.rb --token=YOUR_ACCESS_TOKEN
```

You can edit `config.yml` for more configuration.

## 2-A. Deploy with docker

If you want to deploy with docker, what you should do is just type these command!

```sh
$ docker-compose up -d
$ open http://localhost:9292 # open http://localhost:9292 in your browser
```

## 2-B. Deploy without docker

You should edit `config.yml` to specify the location of mongo, redis server.

### Requirements

- ruby: 2.1.5p273
- mongo db: 2.4.9
- redis: 3.0.2
- node.js: v0.10.25

### 2-B-1. Setup

```sh
$ mongod # you need to start mongo db server
$ redis-server # you need to start redis server
$ bundle install
```

### 2-B-2. Start Slack Message Logger

```sh
$ bundle exec ruby ./logger/logger.rb
```

### 2-B-3. Start Slack Message Viewer

```sh
$ ./viewer/setup.sh
$ bundle exec rackup ./viewer/config.ru
$ open http://localhost:9292 # open http://localhost:9292 in your browser
```

## 3. Import Slack backup file

### 3-A. With GUI (in viewer)

Import dialog will appear when you click team name in viewer.

### 3-B. With Command Line

The size of Slack backup file is big and sometimes it is difficult to upload it with viewer.

You can import Slack backup file with this command.

```sh
$ bundle exec ruby ./bin/import.rb PATH_TO_BACKUP_FILE
```
