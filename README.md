# Slack patron

Log and view all Slack messages in your local server.

![http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png](http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png)

## What Slack patron do?

- Log slack messages, channels, users in MongoDB.
  - Also, you can import all messages with "Exported data"
- View these data in web browser.

## Requirements

- ruby: 2.1.5p273
- mongo db: 2.4.9
- node.js: v0.10.25

## Startup

Copy `config.yml.example` to `config.yml` and edit it.

```sh
$ mongod # you need to start mongo db server
$ bundle install
$ npm install
$ ./node_modules/.bin/gulp
$ ./node_modules/.bin/bower install
$ bundle exec rackup
```

### Development

If you are a developer, you watch js, css as below.

```
$ ./node_modules/.bin/gulp watch
```
