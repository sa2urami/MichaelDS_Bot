const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, guildId, token } = require('./config.json')

let commands = [
    new SlashCommandBuilder()
        .setName('getfullrating')
        .setDescription('Sending you full scoreboard'),
    new SlashCommandBuilder()
        .setName('showproblemtypes')
        .setDescription('Sending you all availible problem types'),
    new SlashCommandBuilder()
        .setName('getproblem')
        .setDescription('Sending you problem')
        .addIntegerOption((option) =>
            option
                .setName('number')
                .setDescription('Index of problem you will receive')
                .setRequired(true),
        ),
    // new SlashCommandBuilder()
    //     .setName('seturl')
    //     .setDescription('Adding url into problem')
    //     .addIntegerOption((option) =>
    //         option
    //             .setName('number')
    //             .setDescription('Index of problem you will receive')
    //             .setRequired(true),
    //     )
    //     .addStringOption((option) =>
    //         option
    //             .setName('url')
    //             .setDescription('URL which will added')
    //             .setRequired(true),
    //     ),
].map((command) => command.toJSON())
const rest = new REST({ version: '9' }).setToken(token)

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error)
