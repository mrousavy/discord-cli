process.stdout.write("\x1Bc");
const Discord = require('discord.js');
const promptFixed = require("./fixedReadLine.js");


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
    console.log('Select channel index:');
    promptFixed.on("line", function(line) {
        var channelIndex = parseInt(input);
        var channel = mapped[channelIndex];
        listen(channel);
    });
}

function listen(channel) {
    promptFixed.start();
    promptFixed.setCompletion([">sc"]);

    promptFixed.on("line", function(line) {
        if (line == "pwd") {
            console.log("toggle muted", !promptFixed.isMuted());
            promptFixed.setMuted(!promptFixed.isMuted(), "> [hidden]");
            return true;
        }

        if (promptFixed.isMuted())
            promptFixed.setMuted(false);
    });

    promptFixed.on("SIGINT", function(rl) {
        rl.question("Confirm exit : ", function(answer) {
            console.log(arguments);
            return (answer.match(/^o(ui)?$/i) || answer.match(/^y(es)?$/i)) ? process.exit(1) : rl.output.write("> ");
        });
    });

    // rl.question(`${channel.name}> `, (input) => {
    //     if (input == ">sc") {
    //         selectChannel();
    //     } else {
    //         channel.send(input);
    //         listen(channel);
    //     }
    // });
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Invite link: ${clientInviteUrl}`);
    selectChannel();
});

client.on('message', msg => {
    console.log(`${msg.member.displayName}: ${msg.content}`);
});

client.login(token);

// var channels = client.channels;
// var filteredChannels = client.channels.filter((c) => {
//     console.log(c.id);
//     return c.type == "text" && c.id == "farm";
// });
// var channel = filteredChannels.first();


