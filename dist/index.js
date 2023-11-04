import { Client, IntentsBitField } from 'discord.js';
import { env } from './env.js';
const myBot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});
myBot.login(env.TOKEN);
// myBot.on('messageCreate', (message) => {
//   if (message.author.bot === true) return;
//   if (message.content == 'ping') message.reply('pong');
// });
myBot.on('ready', (client) => {
    console.log('Logged in as: ', client.user.tag);
});
//# sourceMappingURL=index.js.map