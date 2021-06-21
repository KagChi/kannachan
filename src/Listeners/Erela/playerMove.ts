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
  public event = 'playerMove';
  public async run(player: Player, oldChannel: string, newChannel: string) {
    const { lng } = await findGuild(player.guild) as unknown as GuildDB
    if (!newChannel) {
      this.client.createMessage(player.textChannel as string, {
        embed: {
          description: i18next.t('utility.music.playerDisconnected', { lng: lng ?? config.defaultLang }),
          color: config.color,
        },
      });
      player.destroy();
      return;
    }
    if (newChannel) {
      this.client.createMessage(player.textChannel as string, {
        embed: {
          description: i18next.t('utility.music.playerMoved', { voiceChannel: newChannel, lng: lng ?? config.defaultLang }),
          color: config.color,
        },
      });
      player.setVoiceChannel(newChannel);
      setTimeout(() => player.pause(false), 1500);
    }
  }
}
