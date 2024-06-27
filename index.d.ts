import { Interaction } from 'discord.js';

interface Options {
  confirmLabel?: string;
  cancelLabel?: string;
  timeout?: number;
}

declare function addConfirmationButtons(
  target:  Interaction,
  options?: Options
): Promise<'confirmed' | 'canceled' | 'timeout'>;

export = addConfirmationButtons;
