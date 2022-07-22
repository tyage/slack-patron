import Dexie from 'dexie';

export const db = new Dexie('slack-patron');
db.version(1).stores({
  messages: 'ts, channel, thread_ts',
  users: 'id',
  channels: 'id',
});
