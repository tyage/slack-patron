# Slack Patron
[![Publish Viewer Docker Image](https://github.com/tyage/slack-patron/actions/workflows/publish-viewer.yml/badge.svg)](https://github.com/tyage/slack-patron/actions/workflows/publish-viewer.yml) [![Publish Logger Docker Image](https://github.com/tyage/slack-patron/actions/workflows/publish-logger.yml/badge.svg)](https://github.com/tyage/slack-patron/actions/workflows/publish-logger.yml) [![Publish Connector Docker Image](https://github.com/tyage/slack-patron/actions/workflows/publish-connector.yml/badge.svg)](https://github.com/tyage/slack-patron/actions/workflows/publish-connector.yml) [![Publish ElasticSearch Docker Image](https://github.com/tyage/slack-patron/actions/workflows/publish-elasticsearch.yml/badge.svg)](https://github.com/tyage/slack-patron/actions/workflows/publish-elasticsearch.yml)

- Record Slack messages in MongoDB.
  - You can also import data from backup file.
- Web interface for searching messages.

![](./docs/screenshot.png)

# Quick Usage

1. Install Slack Patron App and get access token for your Slack workspace

<a href="https://slack.com/oauth/authorize?client_id=96488045348.96491351300&scope=client"><img src="https://platform.slack-edge.com/img/add_to_slack.png"></a>

2. Run `docker compose up` with [./docs/docker-compose-quick.yml](./docs/docker-compose-quick.yml)

```sh
$ wget https://raw.githubusercontent.com/tyage/slack-patron/master/docs/docker-compose-quick.yml
$ export SLACK_PATRON_SLACK_TOKEN=[YOUR TOKEN HERE]
$ docker compose -f ./docker-compose-quick.yml up
```

3. Visit http://localhost:9292

# Docs

- [./docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md): for development
- [./docs/BACKUP_IMPORT.md](./docs/BACKUP_IMPORT.md): for import Slack backup file

# Special Thanks

This product receives a lot of contribution from [TSG](https://github.com/tsg-ut) :heart:

<https://github.com/tsg-ut/slack-patron>
