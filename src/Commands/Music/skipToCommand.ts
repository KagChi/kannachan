import { Command } from 'eris';
import i18next from 'i18next';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';

export default class skiptoCommand extends Command {
  constructor(public client: KannaClient) {
    super('skipto', async (msg, args) => {
      if(!this.client.erela.leastUsedNodes.first()?.connected) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.lavalinkNotConnected'),
            color: config.color,
          },
        });
        return;
      }
      if (!this.client.erela.players.get(msg.guildID as string)) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.noActiveGuildQueue'),
            color: config.color,
          },
        });
        return;
      }
      if (!msg.member?.voiceState.channelID) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.mustOnVoice'),
            color: config.color,
          },
        });
        return;
      }
      if (this.client.erela.players.get(msg.guildID as string) && this.client.erela.players.get(msg.guildID as string)?.voiceChannel && msg.member.voiceState.channelID !== this.client.erela.players.get(msg.guildID as string)?.voiceChannel) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.sameAsVoice'),
            color: config.color,
          },
        });
        return;
      }
      if (isNaN(args[0] as any)) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.notValidNumber'),
            color: config.color,
          },
        });
        return;
      } if (Number(args[0]) > (this.client.erela.players.get(msg.guildID as string)?.queue.length as number)) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.skipMoreThanQueue'),
            color: config.color,
          },
        });
        return;
      }
      this.client.erela.players.get(msg.guildID as string as string)?.stop(Number(args[0]));
      msg.channel.createMessage({
        embed: {
          description: i18next.t('command.skip.skippedTo', { track: args[0] })
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
