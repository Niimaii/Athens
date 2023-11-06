import { Client, GatewayIntentBits, Options, Partials } from 'discord.js';
import { env } from './env';
import fs from 'node:fs';
import path from 'node:path';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  makeCache: Options.cacheEverything(),
  partials: [Partials.Message],
});

client.on('messageCreate', (message) => {
  console.log(message.content);
});

const eventsPath = path.join(__dirname, 'events');
// If we are in development use `.ts` else `.js`
let fileExtension = process.env.isCompiled === 'false' ? '.ts' : '.js';

const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(fileExtension));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.default.once) {
    client.once(event.default.name, (...args) =>
      event.default.execute(...args)
    );
  } else {
    client.on(event.default.name, (...args) => event.default.execute(...args));
  }
}

client.login(env.TOKEN);
