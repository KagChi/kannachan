import { Player } from 'erela.js';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';

export default class listener {
  constructor(public client: KannaClient) { }

  public run(player: Player, oldChannel: string, newChannel: string) {
    if (!newChannel) {
      this.client.createMessage(player.textChannel as string, {
        embed: {
          description: '⛔ | Disconnected from voicechannel, cleared guild queue.',
          color: config.color,
        },
      });
      player.destroy();
      return;
    }
    if (newChannel) {
      this.client.createMessage(player.textChannel as string, {
        embed: {
          description: `⛔ | player moved to <#${newChannel}>`,
          color: config.color,
        },
      });
      player.setVoiceChannel(newChannel);
      setTimeout(() => player.pause(false), 1500);
    }
  }
}
