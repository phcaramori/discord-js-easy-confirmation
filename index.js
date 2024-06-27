const { ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionCollector } = require('discord.js');

/**
 * Adds confirmation buttons (Confirm / Cancel) to a message.
 * @param {CommandInteraction} interaction - The interaction to add the buttons to.
 * @param {Object} [options] - Options for customizing the confirmation buttons, see properties.
 * @param {string} [options.confirmLabel='Confirm'] - Label for the green confirm button. Default: "Confirm". 
 * @param {string} [options.cancelLabel='Cancel'] - Label for the red cancel button. Default: "Cancel".
 * @param {number} [options.timeout=60_000] - Time in milliseconds before the buttons expire. Default: 60000 (1 minute). Maximum recomended time is 900000ms (15 minutes). 
 * @param {ButtonStyle} [options.confirmStyle] - Allows you to pass in a custom style for the confirmation button
 * @param {ButtonStyle} [options.cancelStyle] - Allows you to pass in a custom style for the cancellation button
 * @returns {Promise<string>} - Resolves with 'confirmed', 'canceled', or 'timeout' based on the user's button press.
 */
async function addConfirmationButtons(inputInteraction, options = {}) {
  const {
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    timeout = 60_000,
    confirmStyle = ButtonStyle.Success,
    cancelStyle = ButtonStyle.Danger
  } = options;

  // Create the buttons
  const confirmID = `easyconfirm-Confirm-${inputInteraction.id}`
  const cancelID = `easyconfirm-Cancel-${inputInteraction.id}` 
  const confirmButton = new ButtonBuilder()
      .setCustomId(confirmID)
      .setLabel(confirmLabel)
      .setStyle(confirmStyle);

  const cancelButton = new ButtonBuilder()
			.setCustomId(cancelID)
			.setLabel(cancelLabel)
			.setStyle(cancelStyle);
		 
  const row = new ActionRowBuilder().addComponents(confirmButton, cancelButton);

  await inputInteraction.editReply({ components: [row] });

  return new Promise(async (resolve, reject) => {
    const collectorFilter = (responseInteraction) => [confirmID, cancelID].includes(responseInteraction.customId) && responseInteraction.user.id === inputInteraction.user.id;
    const collector = inputInteraction.channel.createMessageComponentCollector({ filter: collectorFilter, time: timeout });

    collector.on('collect', async (interaction) => {
      if (interaction.customId === confirmID) {
        await inputInteraction.editReply({ components: [] }); //remove btns
        resolve('confirmed');
      } else if (interaction.customId === cancelID) {
        await inputInteraction.editReply({ components: [] }); //remove btns
        resolve('canceled');
      }
    });

    collector.on('end', async (collected, reason) => {
      if (reason === 'time') {
        await inputInteraction.editReply({ components: [] }).catch(console.error); //remove btns
        resolve('timeout');
      }
    });
  });
}

module.exports = addConfirmationButtons;