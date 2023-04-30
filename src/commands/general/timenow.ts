import {SlashCommandBuilder, ChatInputCommandInteraction} from 'discord.js';
import {CommandClass} from "../../structures/command.js";
import pkg from 'pg';

const {Pool} = pkg;

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
});
export default new CommandClass({
    data: new SlashCommandBuilder()
        .addUserOption(option =>
            option.setName('username')
                .setDescription('The user time to convert to the  to local time.')
                .setRequired(true))
        .setName('timenow')
        .setDescription("Finds a user's local time."),
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'General',
        cooldown: 5,
        visible: true,
        guildOnly: false,
    },
    async execute(interaction: ChatInputCommandInteraction<'cached'>) {
        console.log(process.env.CONNECTION_STRING);
        let userMention = interaction.options.getUser('username');
        let user = interaction.guild.members.resolve(userMention)?.user;
        let username = user.tag;

        const query = {
            text: 'SELECT timezone FROM teammates WHERE discord = $1',
            values: [username],
        };
        try {
            let result = await pool.query(query);
            if (result.rowCount === 0) {
                await interaction.reply(`No timezone found for user ${username}.`);
            } else {
                let userTimeZone = result.rows[0].timezone;
                let date = new Date();
                let convertedTime = date.toLocaleTimeString('en-US', {
                    timeZone: userTimeZone, hour: 'numeric', minute: 'numeric'
                });

                // code to convert current time to the timezone goes here
                await interaction.reply(`The current time for user ${username} is ${convertedTime}.`);
            }
        } catch (error) {
            console.error('Error executing query:', error);
            await interaction.reply('An error occurred while retrieving the timezone. Please try again later.');
        }
    }
});
