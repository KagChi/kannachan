import { Command } from 'eris';
import i18next from 'i18next';
import config from '../../config';
import { GuildDB } from '../../Models/Guild';
import KannaClient from '../../Struct/KannaClient';
import { findGuild } from '../../Util/Mongoose';

export default class skiptoCommand extends Command {
  constructor(public client: KannaClient) {
    super('skipto', async (msg, args) => {
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
      if (isNaN(args[0] as any)) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.notValidNumber', { lng: lng ?? config.defaultLang }),
            color: config.color,
          },
        });
        return;
      } if (Number(args[0]) > (this.client.erela.players.get(msg.guildID as string)?.queue.length as number)) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.skipMoreThanQueue', { lng: lng ?? config.defaultLang }),
            color: config.color,
          },
        });
        return;
      }
      this.client.erela.players.get(msg.guildID as string as string)?.stop(Number(args[0]));
      msg.channel.createMessage({
        embed: {
          description: i18next.t('command.skip.skippedTo', { track: args[0], lng: lng ?? config.defaultLang })
        }
      })
      return;
    }, {
      description: 'skip to certain queue.',
      aliases: ['sto'],
      argsRequired: true,
    });
  }

    public category = 'Music'
}
