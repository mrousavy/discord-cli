const Discord = require('discord.js');
const readline = require('readline');


const client = new Discord.Client();
const token = 'NTYwMzYxMjY1MTM5Mjg2MDE3.D3y1uA.jJ4yK5UuGJqK6oKiCHAjAvbWETA';
const permissions = '68608';
const clientId = '560361265139286017';
const clientInviteUrl = `https://discordapp.com/oauth2/authorize?&client_id=${clientId}&scope=bot&permissions=${permissions}`;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function listen(channel) {
    rl.question(`${channel}>`, (input) => {
        channel.send(input);
        listen(channel);
    });
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Invite link: ${clientInviteUrl}`);
    var channel = client.channels.get('560355026996822036');
    listen(channel);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(token);

// var channels = client.channels;
// var filteredChannels = client.channels.filter((c) => {
//     console.log(c.id);
//     return c.type == "text" && c.id == "farm";
// });
// var channel = filteredChannels.first();


