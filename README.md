# Slack logger and viewer

![http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png](http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png)

copy `config.yml.example` to `config.yml` and edit it.

```sh
$ bundle install
$ npm install
$ bower install
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

## Starting logger

```sh
$ bundle exec ruby logger.rb
```

## Starting viewer

```sh
$ ./node_modules/.bin/gulp
$ bundle exec rackup
```
