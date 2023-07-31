import { Client } from 'discord.js';
import { config } from 'dotenv';

// Load all the .env variables
config();
const TOKEN = process.env.TOKEN;

const client = new Client({ intents: ['Guilds', 'GuildMessages'] });

client.login(TOKEN);
