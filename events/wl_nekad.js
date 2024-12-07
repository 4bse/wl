const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isButton()) {
      if (interaction.customId.startsWith("nekad - ")) {
        try {
          const stringId = interaction.customId.replace("nekad - ", "");
          const member = await client.users.fetch(stringId).catch((err) => {
            console.error("Failed to fetch user:", err);
            return null;
          });

          if (!member) {
            console.error("Member could not be fetched.");
            return;
          }

          const id = interaction.user.id;
          const member2 = interaction.member;

          if (!member2 || !member2.user) {
            console.error("Member or member user is not defined.");
            return;
          }

          const embed = new EmbedBuilder()
            .setColor("#00C441")
            .setTitle("Nekad till Whitelist")
            .setDescription("Tyvärr har du blivit nekad till Whitelist. Du får jätte gärna ansöka igen!")
            .addFields({ name: "Nekare", value: `\`${member2.user.username} (${id})\`` });

          await member.send({ embeds: [embed] }).catch((err) => {
            console.error("Failed to send DM:", err);
          });

          const replyEmbed = new EmbedBuilder()
            .setColor("#00C441")
            .setTitle("Nekad!")
            .setDescription("Du har nu nekat denna person till Whitelist.")
            .addFields({ name: "Nekare", value: `\`${member2.user.username} (${id})\`` });

          await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

          await interaction.message.delete().catch((err) => {
            console.error("Failed to delete the message:", err);
          });
        } catch (err) {
          console.error("Error handling button interaction:", err);
        }
      }
    }

    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error("Error executing command:", error);
    }
  },
};
