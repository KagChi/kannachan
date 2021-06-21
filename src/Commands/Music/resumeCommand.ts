import { Command } from 'eris';
import i18next from 'i18next';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';
import { findGuild } from '../../Util/Mongoose';
import { GuildDB } from '../../Models/Guild';
export default class resumeCommand extends Command {
  constructor(public client: KannaClient) {
    super('resume', async (msg) => {
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
      this.client.erela.players.get(msg.guildID as string)?.pause(false);
      msg.channel.createMessage({
        embed: {
          description: i18next.t('command.resume.resumed', { lng: lng ?? config.defaultLang }),
          color: config.color,
        },
      });
    }, {
      description: 'resume current playing track',
      aliases: [],
    });
  }

    public category = 'Music'
}
