import { Player, Track } from 'erela.js';
import { Member } from 'eris';
import i18next from 'i18next';
import config from '../../config';
import { GuildDB } from '../../Models/Guild';
import KannaClient from '../../Struct/KannaClient';
import { findGuild } from '../../Util/Mongoose';

export default class listener {
  constructor(public client: KannaClient) { }
  public type = 'on';
  public emitter = 'erela';
  public event = 'trackStart';
  public async run(player: Player, track: Track) {
    const { lng } = await findGuild(player.guild) as unknown as GuildDB
    const msg = await this.client.createMessage(player.textChannel as string, {
      embed: {
        description: `▶ | ${i18next.t('utility.music.nowplaying', { lng: lng ?? config.defaultLang })} \`${track.title}\` \`[${(track.requester as Member).user.username}]\``,
        thumbnail: {
          url: track.thumbnail ?? undefined,
        },
        color: config.color,
      },
    });
    setTimeout(() => {
      msg.delete();
    }, track.duration);
  }
}
