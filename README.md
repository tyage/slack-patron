# Slack logger and viewer

![http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png](http://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png)

copy `config.yml.example` to `config.yml` and edit it.

```sh
$ bundle install
$ bundle exec rake db:migrate
```

## Starting logger

```sh
$ bundle exec ruby logger.rb
```

## Starting viewer

```sh
$ bower install
$ bundle exec rackup
```
