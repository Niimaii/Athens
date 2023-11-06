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
  const timeout = reaction.message.member.communicationDisabledUntil;
  const now = new Date();
  const lastTimedOut = new Date(timeout);

  //   If when last timed out was prior to now then make me 0, else make me equal to the difference in milliseconds
  let timeoutLeft =
    now.getTime() > lastTimedOut.getTime()
      ? 0
      : lastTimedOut.getTime() - now.getTime();
  let emoji = reaction.emoji;

  console.log(timeoutLeft);

  if (emoji.id == '1170550414689714197') {
    // Timeout user who's message was reacted to
    console.log(`${user.username} reacted`);
    // Add 2:30mins + the current timeout
    reaction.message.member.timeout(timeoutLeft + 2.5 * 60 * 1000);
  }
});
