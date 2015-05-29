# Slack logger and viewer

![http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png](http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png)

## Requirements

- ruby: 2.1.5p273
- mongo db: 2.4.9
- node.js: v0.10.25

## Startup

copy `config.yml.example` to `config.yml` and edit it.

```sh
$ bundle install
$ npm install
$ ./node_modules/.bin/bower install
$ mongod # you need to start mongo db server
```

## Watch js and css src

```
$ ./node_modules/.bin/gulp watch
```

## Import exported data

download exports(ziped file) from `https://YOUR-TEAM.slack.com/services/export`

```sh
$ bundle exec ruby import.rb PATH_TO_ZIP_FILE
```

## Start logger

```sh
$ bundle exec ruby logger.rb
```

## Start viewer

```sh
$ ./node_modules/.bin/gulp
$ bundle exec rackup
```
