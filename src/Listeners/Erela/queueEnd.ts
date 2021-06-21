import { Player } from 'erela.js';
import i18next from 'i18next';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';

export default class listener {
  constructor(public client: KannaClient) { }

  public run(player: Player) {
    this.client.createMessage(player.textChannel as string, {
      embed: {
        description: i18next.t('utility.music.queueEnd'),
        color: config.color,
      },
    });
  }
}
