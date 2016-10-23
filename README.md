# Slack patron

Log and view all Slack messages.

PR is welcome!!

![http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png](http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png)

## What Slack patron do?

- Log slack messages, channels, users in MongoDB.
  - Also, you can import all data with backup file.
- View these data in web browser.

![https://i.gyazo.com/e38237c8ac0259b9ee0549a67a52bc64.png](https://i.gyazo.com/e38237c8ac0259b9ee0549a67a52bc64.png)

## Use with docker

Copy `config.yml.example` to `config.yml` and edit it.

**Notice: database uri should be `mongo:27017` and redis uri should be `redis://redis:6379`.**

```sh
$ docker-compose up -d
$ open http://localhost:19292
```

## Use without docker

### Requirements

- ruby: 2.1.5p273
- mongo db: 2.4.9
- redis: 3.0.2
- node.js: v0.10.25

### Startup

Copy `config.yml.example` to `config.yml` and edit it.

```sh
$ mongod # you need to start mongo db server
$ redis-server # you need to start redis server
$ bundle install
```

#### Start Slack Message Logger

```sh
$ bundle exec ruby logger/logger.rb
```

#### Start Slack Message Viewer

```sh
$ ./viewer/setup.sh
$ bundle exec rackup viewer/config.ru
```

## Import Slack backup file with CLI

**Notice: This may not work with docker now...**

The size of Slack backup file is big and sometimes it is difficult to upload it with patron's webpage.

You can import Slack backup file with CLI.

```sh
$ bundle exec ruby import.rb PATH_TO_BACKUP_FILE
```
