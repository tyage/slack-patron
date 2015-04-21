# Slack logger and viewer

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

```
bundle exec rackup
```
