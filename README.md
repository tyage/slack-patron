# Slack patron

- Record Slack messages in MongoDB.
  - You can also import data from backup file.
- Web interface for searching messages.

![](https://i.gyazo.com/626298851b7eb9a878b72ccc788b7086.png)

# Usage

1. Install Slack Patron App and get access token for your Slack workspace

<https://slack-patron.herokuapp.com/>

2. Run `docker compose up`

```
$ SLACK_PATRON_TOKEN=[YOUR TOKEN HERE]
$ docker compose up
```

3. Visit http://localhost:9292

For more information, see [./docs/ADVANCED.md](./docs/ADVANCED.md)

# Special Thanks

This product receives a lot of contribution from
[TSG](https://github.com/tsg-ut) <https://github.com/tsg-ut/slack-patron>
