const { Client, Intents } = require('discord.js')
const { token } = require('./config.json')
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
client.once('ready', () => {
    console.log('Ready!')
})
class Problem {
    constructor() {
        this
    }
}

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return

    const { commandName } = interaction

    if (commandName === 'ping') {
        await interaction.reply('Pong!')
    } else if (commandName === 'server') {
        await interaction.reply(
            `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
        )
    } else if (commandName === 'user') {
        await interaction.reply(
            `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`,
        )
    } else if (commandName === 'problem') {
        message.channel.send('Message that goes above image', {
            files: ['./image-to-send.png'],
        })
    }
})

client.login(token)
