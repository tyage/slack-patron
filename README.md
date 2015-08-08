# Slack patron

Log and view all Slack messages in your local server.

![http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png](http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png)

## What Slack patron do?

- Log slack messages, channels, users in MongoDB.
  - Also, you can import all data with backup file.
- View these data in web browser.

![https://i.gyazo.com/721ef8987963c2acf20112fc033029cc.png](https://i.gyazo.com/721ef8987963c2acf20112fc033029cc.png)

## Requirements

- ruby: 2.1.5p273
- mongo db: 2.4.9
- redis: 3.0.2
- node.js: v0.10.25

## Startup

Copy `config.yml.example` to `config.yml` and edit it.

```sh
$ mongod # you need to start mongo db server
$ redis-server # you need to start redis server
$ bundle install
$ npm install
$ ./node_modules/.bin/gulp
$ ./node_modules/.bin/bower install
$ bundle exec sidekiq -r ./lib/sidekiq.rb -d -L log/sidekiq.log
$ bundle exec rackup
```

### Development

If you are a developer, you watch js, css as below.

```sh
$ ./node_modules/.bin/gulp watch
```

### Import Slack backup file in CLI

The size of Slack backup file is big and sometimes it is difficult to upload it with patron's page.

But you can import Slack backup file in CLI.

```sh
$ bundle exec ruby app/import.rb PATH_TO_BACKUP_FILE
```
