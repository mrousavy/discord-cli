const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NTYwMzYxMjY1MTM5Mjg2MDE3.D3y1uA.jJ4yK5UuGJqK6oKiCHAjAvbWETA';
const permissions = '68608';
const clientId = '560361265139286017';
const clientInviteUrl = `https://discordapp.com/oauth2/authorize?&client_id=${clientId}&scope=bot&permissions=${permissions}`;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Invite link: ${clientInviteUrl}`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(token);
