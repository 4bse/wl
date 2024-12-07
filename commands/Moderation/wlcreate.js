const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reg-wl')
        .setDescription('Skapa en embed med knapp till Whitelist ansökan'),

    async execute(interaction) {
        try {
            const select = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('wla')
                        .setLabel('Ansök Whitlist')
                        .setStyle(ButtonStyle.Secondary)
                );

            const embed = new EmbedBuilder()
                .setColor('#00C441')
                .setTitle('📝 Whitelist Ansökan')
                .setDescription('Ansök till whitelist här!');

            await interaction.reply({ embeds: [embed], components: [select] });
        } catch (error) {
            console.error('Error executing /reg-wl:', error);

            // Handle errors gracefully
            if (!interaction.replied) {
                await interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
            }
        }
    }
};
