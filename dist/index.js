"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const env_1 = require("./env");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
    ],
});
// client.on('ready', () => {
//   console.log(`${client.user.username} has logged in`);
// });
client.on('messageCreate', (message) => {
    console.log(message.content);
});
const eventsPath = node_path_1.default.join(__dirname, 'events');
const eventFiles = node_fs_1.default
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = node_path_1.default.join(eventsPath, file);
    const event = require(filePath);
    console.log(event);
    if (event.default.once) {
        client.once(event.default.name, (...args) => event.default.execute(...args));
    }
    else {
        client.on(event.default.name, (...args) => event.default.execute(...args));
    }
}
// async function runEvents() {
//   const eventsPath = path.join(__dirname, 'events');
//   const eventFiles = fs
//     .readdirSync(eventsPath)
//     .filter((file) => file.endsWith('.js'));
//   for (const file of eventFiles) {
//     const filePath = path.join(eventsPath, file);
//     const { default: event } = await import(filePath);
//     console.log(event.default.name);
//     if (event.once) {
//       client.once(event.default.name, (...args) =>
//         event.default.execute(...args)
//       );
//     } else {
//       client.on(event.default.name, (...args) =>
//         event.default.execute(...args)
//       );
//     }
//   }
//   console.log(eventFiles);
//   console.log(eventsPath);
// }
// runEvents();
client.login(env_1.env.TOKEN);
// // Time out users when reacting with the :timeout: emoji
// client.on('messageReactionAdd', (reaction, user) => {
//   const timeout = reaction.message.member.communicationDisabledUntil;
//   const now = new Date();
//   const lastTimedOut = new Date(timeout);
//   // If when last timed out was prior to now then make me 0, else make me equal to the difference in milliseconds
//   let timeoutLeft =
//     now.getTime() > lastTimedOut.getTime()
//       ? 0
//       : lastTimedOut.getTime() - now.getTime();
//   let emoji = reaction.emoji;
//   console.log(timeoutLeft);
//   if (emoji.id == '1170550414689714197') {
//     // Timeout user who's message was reacted to
//     console.log(`${user.username} reacted`);
//     // Add 2:30mins + the current timeout
//     reaction.message.member.timeout(timeoutLeft + 2.5 * 60 * 1000);
//   }
// });
// // TODO
// // Remove the timeout that the user gave
// client.on('messageReactionRemove', (reaction, user) => {
//   const timeout = reaction.message.member.communicationDisabledUntil;
//   const now = new Date();
//   const lastTimedOut = new Date(timeout);
//   // If when last timed out was prior to now then make me 0, else make me equal to the difference in milliseconds
//   let timeoutLeft =
//     now.getTime() > lastTimedOut.getTime()
//       ? 0
//       : lastTimedOut.getTime() - now.getTime();
//   let emoji = reaction.emoji;
//   console.log(timeoutLeft);
//   if (emoji.id == '1170550414689714197') {
//     // Timeout user who's message was reacted to
//     console.log(`${user.username} reacted`);
//     // Add 2:30mins + the current timeout
//     reaction.message.member.timeout(-2.5 * 60 * 1000);
//   }
// });
// // Timer
//# sourceMappingURL=index.js.map