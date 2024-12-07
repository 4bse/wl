const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reg-wl')
        .setDescription('Skapa en embed med knapp till Whitelist ansökan'),

    async execute(interaction) {
        try {
            // Guard against already replied interaction
            if (interaction.replied || interaction.deferred) {
                console.log("Interaction has already been replied to.");
                return; // Don't proceed if it's already been replied to
            }

            // Define the button for Whitelist application
            const select = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('wla')  // Custom ID for the button interaction
                        .setLabel('Ansök Whitelist')  // Button label
                        .setStyle(ButtonStyle.Secondary)
                );

            // Create the embed to accompany the button
            const embed = new EmbedBuilder()
                .setColor('#00C441')
                .setTitle('📝 Whitelist Ansökan')
                .setDescription('Ansök till whitelist här!');

            // Reply to the interaction with the embed and button
            await interaction.reply({
                embeds: [embed],
                components: [select],
            });
        } catch (error) {
            console.error(`Error in reg-wl command: ${error}`);
            if (!interaction.replied) {
                // Send an error message if the interaction wasn't already replied to
                await interaction.reply({
                    content: 'An error occurred while processing your request.',
                    ephemeral: true,
                });
            }
        }
    },
};
