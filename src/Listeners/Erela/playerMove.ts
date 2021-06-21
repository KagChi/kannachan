import { Player } from 'erela.js';
import i18next from 'i18next';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';

export default class listener {
  constructor(public client: KannaClient) { }

  public run(player: Player, oldChannel: string, newChannel: string) {
    if (!newChannel) {
      this.client.createMessage(player.textChannel as string, {
        embed: {
          description: i18next.t('utility.music.playerDisconnected'),
          color: config.color,
        },
      });
      player.destroy();
      return;
    }
    if (newChannel) {
      this.client.createMessage(player.textChannel as string, {
        embed: {
          description: i18next.t('utility.music.playerMoved', { voiceChannel: newChannel }),
          color: config.color,
        },
      });
      player.setVoiceChannel(newChannel);
      setTimeout(() => player.pause(false), 1500);
    }
  }
}
