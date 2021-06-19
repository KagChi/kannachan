import { Player } from 'erela.js';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';

export default class listener {
  constructor(public client: KannaClient) { }

  public run(player: Player) {
    this.client.createMessage(player.textChannel as string, {
      embed: {
        description: '⛔ | An error occured when playing the track',
        color: config.color,
      },
    });
  }
}
