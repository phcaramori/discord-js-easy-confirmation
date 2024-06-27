# Installation
```
npm install discord-js-easy-confirmation
```
**This package requires discord.js v14.0.0 or newer.**
# Usage
The package consists of a single function that takes in an interaction (slash command) created by a user. The package then appends Confirm and Cancel buttons to your bot's response to the interaction, and returns a promise that resolves to one of 3 strings: `"confirmed"`, `"canceled"`, or `"timeout"`; depending on the user's input (or lack thereof). Confirmations/cancellations are only accepted from the user who created the interaction.

After a response, the package removes the appended buttons from the mesage, but does not edit the message's content. 

### Example:
```js
const addConfirmationButtons = require('discord-js-command-confirmations'); 
// or import addConfirmationButtons from 'discord-js-command-confirmations'; 

async execute(interaction) { //recieve interaction
	await interaction.reply("Are you sure?");
	const result = await addConfirmationButtons(interaction);

	if (result === 'confirmed') {
		interaction.editReply('You have confirmed the action.');
		//Perform the action
	} else if(result === 'canceled') {
		interaction.editReply('You have canceled the action.');
	} else if(result === 'timeout'){
		interaction.editReply('You took too long! The action timedout and was canceled.');
	}
}
```
### Options:
You can optionally send an object containing various options to the function, allowing changes to the time before timeout, the button styles, and button labels. 

`const result = await addConfirmationButtons(interaction, {timeout: 10_000} );` --> Decreases timeout from default of 60s to 10s

`const result = await addConfirmationButtons(interaction, {confirmLabel: 'Ban', cancelLabel: 'Pardon'} );` --> Changes default button labels

## Thank you for using!