const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isButton()) {
      if (interaction.customId.includes("godkänd - ")) {
        var stringId = interaction.customId.replace("godkänd - ", "");
        var member = await client.users.fetch(stringId);
          
        const id = interaction.user.id;
        const member2 = interaction.member;
          
        const embed = new EmbedBuilder()
          .setColor("#00C441")
          .setTitle("Godkänd!")
          .setDescription(
            `Grattis! Du har blivit godkänd och en ansvarig kommer ta kontakt med dig. `)
          .addFields({ name: "Godkännare", value: `\`${member2.user.username} (${id})\`` });;

        await member.send({ embeds: [embed] });
          
        const replyEmbed = new EmbedBuilder()
          .setColor("#00C441")
          .setTitle("Godkänd!")
          .setDescription("Du har nu godkänt denna person till Whitelist.")
          .addFields({ name: "Godkännare", value: `\`${member2.user.username} (${id})\`` });

        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

        await interaction.message.delete().catch((err) => {});
      }
    }

    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
