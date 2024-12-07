const { EmbedBuilder, Events, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (!interaction.guild || !interaction.isModalSubmit()) return;

    if (interaction.customId === 'wla2') {
      const command = interaction.fields.getTextInputValue('type')
      const description = interaction.fields.getTextInputValue('description')
      const hkdabteps = interaction.fields.getTextInputValue('hkdabteps')
      const hemligt = interaction.fields.getTextInputValue('hemligt')
      const rfa = interaction.fields.getTextInputValue('rfa')
      const mor = interaction.fields.getTextInputValue('mor')
      const gängm = interaction.fields.getTextInputValue('gängm')

      const id = interaction.user.id;
      const member = interaction.member;
      const server = interaction.guild;

      const channel = await client.channels.cache.get('1314313346522284132');

      const embed = new EmbedBuilder()
        .setColor('00C441')
        .setTitle('WL Del 2')
        .addFields({ name: "User", value: `\`${member.user.username} (${id})\`` })
        .addFields({ name: "Server", value: `\`${server.name} (${server.id})\`` })
        .addFields({ name: "Hur kommer du att bidra till en positiv spelupplevelse?", value: `> ${hkdabteps}` })
        .addFields({ name: "Hemligt ord", value: `> ${hemligt}` })
        .addFields({ name: "Respekt för Administratörer", value: `> ${rfa}` })
        .addFields({ name: "Metagaming och rollspelsengagemang", value: `> ${mor}` })
        .addFields({ name: "Gängmedlemskap", value: `> ${gängm}` })
        .setTimestamp()
        .setFooter({ text: 'Whitelist Ansökan System' });

      const button = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`godkänd - ${id}`)
            .setStyle('Primary') // 'Danger' should be uppercase
            .setLabel('Godkänd!')
        );
         const button2 = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`nekad - ${id}`)
            .setStyle('Secondary') // 'Danger' should be uppercase
            .setLabel('Nekad')
        );

      await channel.send({ embeds: [embed], components: [button, button2] }).catch(console.error);
   
        
      const replyEmbed = new EmbedBuilder()
        .setColor('00C441')
        .setTitle('Whitelist Ansökan skickad!')
        .setDescription('Nu har du skickat in en Whitelist ansökan, du kommer få ett meddelande från denna bot om du har blivit godkänd eller inte. Håller tummarna! :)');

      // Reply to the interaction with the reply embed
        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
    }
  }
};
