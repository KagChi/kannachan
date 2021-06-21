import { Command } from 'eris';
import i18next from 'i18next';
import config from '../../config';
import { GuildDB } from '../../Models/Guild';
import KannaClient from '../../Struct/KannaClient';
import { findGuild } from '../../Util/Mongoose';

export default class shuffleCommand extends Command {
  constructor(public client: KannaClient) {
    super('shuffle', async (msg) => {
      const { lng } = await findGuild(msg.guildID as string) as unknown as GuildDB
      if(!this.client.erela.leastUsedNodes.first()?.connected) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.lavalinkNotConnected', { lng: lng ?? config.defaultLang }),
            color: config.color,
          },
        });
        return;
      }
      if (!this.client.erela.players.get(msg.guildID as string)) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.noActiveGuildQueue', { lng: lng ?? config.defaultLang }),
            color: config.color,
          },
        });
        return;
      }
      if (!msg.member?.voiceState.channelID) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.mustOnVoice', { lng: lng ?? config.defaultLang }),
            color: config.color,
          },
        });
        return;
      }
      if (this.client.erela.players.get(msg.guildID as string) && this.client.erela.players.get(msg.guildID as string)?.voiceChannel && msg.member.voiceState.channelID !== this.client.erela.players.get(msg.guildID as string)?.voiceChannel) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.sameAsVoice', { lng: lng ?? config.defaultLang }),
            color: config.color,
          },
        });
        return;
      }
      this.client.erela.players.get(msg.guildID as string)?.queue.shuffle();
      msg.channel.createMessage({
        embed: {
          description: i18next.t('command.shuffle.shuffled', { lng: lng ?? config.defaultLang }),
          color: config.color,
        },
      });
    }, {
      description: 'shuffle current queue',
      aliases: [],
    });
  }

    public category = 'Music'
}
