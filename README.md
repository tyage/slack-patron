# Slack patron

- Record Slack messages in MongoDB.
  - You can also import data from backup file.
- Web interface for searching messages.

![](./docs/screenshot.png)

# Quick Usage

1. Install Slack Patron App and get access token for your Slack workspace

<https://slack-patron.herokuapp.com/>

2. Run `docker compose up` with [./docs/docker-compose-quick.yml](./docs/docker-compose-quick.yml)

```sh
$ export SLACK_PATRON_SLACK_TOKEN=[YOUR TOKEN HERE]
$ docker compose up -f ./docs/docker-compose-quick.yml
```

3. Visit http://localhost:9292

# Docs

- [./docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md): for development
- [./docs/BACKUP_IMPORT.md](./docs/BACKUP_IMPORT.md): for import Slack backup file

# Special Thanks

This product receives a lot of contribution from
[TSG](https://github.com/tsg-ut) <https://github.com/tsg-ut/slack-patron>
