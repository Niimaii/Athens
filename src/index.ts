import { Client, GatewayIntentBits } from 'discord.js';
import { env } from './env';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.login(env.TOKEN);

client.on('ready', () => {
  console.log(`${client.user.username} has logged in`);
});

client.on('messageCreate', (message) => {
  console.log(message.content);
});

client.on('messageReactionAdd', (reaction, user) => {
  let message = reaction.message;
  let emoji = reaction.emoji;

  if (emoji.id == '1170550414689714197') {
    // Timeout user who's message was reacted to
    console.log(`${user.username} reacted`);
    reaction.message.member.timeout(2.5 * 60 * 1000);
  }
});
