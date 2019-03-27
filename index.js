const Discord = require('discord.js');
const inquirer = require('inquirer');
const robot = require("robotjs");

const client = new Discord.Client();
const token = 'NTYwMzYxMjY1MTM5Mjg2MDE3.D3y1uA.jJ4yK5UuGJqK6oKiCHAjAvbWETA';
const permissions = '68608';
const clientId = '560361265139286017';
const clientInviteUrl = `https://discordapp.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=${permissions}`;

function selectChannel() {
    var mapped = client.channels.map((v, k) => {
        return v;
    });
    mapped.forEach((c, i) => {
        if (c && c.type == 'text')
            console.log(`  ${i}: ${c.name}`);
    });

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'index',
                message: "Select channel index:",
                validate: function (value) {
                    try {
                        const index = parseInt(value);
                        return index > 0 && index < mapped.length;
                    } catch (e) { }
                }
            }
        ]).then((answers) => {
            var channelIndex = parseInt(answers.index);
            var channel = mapped[channelIndex];
            listen(channel);
        });
}

function listen(channel) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'message',
                message: `${channel.name}>`
            }
        ]).then((answers) => {
            var input = answers.message;
            if (input == ">sc") {
                selectChannel();
            } else {
                channel.send(input);
                listen(channel);
            }
        });
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Invite link: ${clientInviteUrl}`);
    selectChannel();
});

client.on('message', msg => {
    if (msg.member.id != client.user.id) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`${msg.member.displayName}> ${msg.content}\n`);
        robot.keyTap('space');
    }
});

client.login(token);

// var channels = client.channels;
// var filteredChannels = client.channels.filter((c) => {
//     console.log(c.id);
//     return c.type == "text" && c.id == "farm";
// });
// var channel = filteredChannels.first();


