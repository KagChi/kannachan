import { Player } from 'erela.js';
import i18next from 'i18next';
import config from '../../config';
import { GuildDB } from '../../Models/Guild';
import KannaClient from '../../Struct/KannaClient';
import { findGuild } from '../../Util/Mongoose';

export default class listener {
  constructor(public client: KannaClient) { }
  public type = 'on';
  public emitter = 'erela';
  public event = 'trackStuck';
  public async run(player: Player) {
    const { lng } = await findGuild(player.guild) as unknown as GuildDB
    this.client.createMessage(player.textChannel as string, {
      embed: {
        description: i18next.t('utility.music.trackError', { lng: lng ?? config.defaultLang }),
        color: config.color,
      },
    });
  }
}
