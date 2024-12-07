const { EmbedBuilder, Events, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (!interaction.guild || !interaction.isModalSubmit()) return;

    if (interaction.customId === 'wla') {
      const command = interaction.fields.getTextInputValue('type')
      const description = interaction.fields.getTextInputValue('description')
      const användarnamn = interaction.fields.getTextInputValue('användarnamn')
      const ålder = interaction.fields.getTextInputValue('ålder')
      const teaf = interaction.fields.getTextInputValue('teaf')
      const far = interaction.fields.getTextInputValue('far')
      const rk = interaction.fields.getTextInputValue('rk')

      const id = interaction.user.id;
      const member = interaction.member;
      const server = interaction.guild;

      const channel = await client.channels.cache.get('1314313346522284132');

      const embed = new EmbedBuilder()
        .setColor('00C441')
        .setTitle('Ny Whitelist ansökan!')
        .addFields({ name: "User", value: `\`${member.user.username} (${id})\`` })
        .addFields({ name: "Server", value: `\`${server.name} (${server.id})\`` })
        .addFields({ name: "Användarnamn", value: `> ${användarnamn}` })
        .addFields({ name: "Ålder", value: `> ${ålder}` })
        .addFields({ name: "Tidigare erfarenhet av FiveM", value: `> ${teaf}` })
        .addFields({ name: "Förståelse av regler", value: `> ${far}` })
        .addFields({ name: "Roll/karaktär", value: `> ${rk}` })
        .setTimestamp()
        .setFooter({ text: 'Whitelist Ansökan System' });

      const button = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`påminnelse - ${id}`)
            .setStyle('Secondary') // 'Danger' should be uppercase
            .setLabel('Påmind användaren om att ansöka andra delen.')
        );

      await channel.send({ embeds: [embed], components: [button] }).catch(console.error);
        
      const select = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('wla2')
                        .setLabel('Del 2')
                        .setStyle(ButtonStyle.Secondary)
               );      
        
      const replyEmbed = new EmbedBuilder()
        .setColor('00C441')
        .setTitle('Ansökan Del 2')
        .setDescription('Här kommer del 2 av Whitelist ansökan');

      // Reply to the interaction with the reply embed
        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
    }
  }
};
