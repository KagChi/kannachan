import { Track } from 'erela.js';
import { Command } from 'eris';
import i18next from 'i18next';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';

export default class removeCommand extends Command {
  constructor(public client: KannaClient) {
    super('remove', async (msg, args) => {
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
      }
      if (Number(args[0]) > (this.client.erela.players.get(msg.guildID as string)?.queue.length as number)) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.moreThanQueue'),
            color: config.color,
          },
        });
        return;
      }
      const removedTrack = this.client.erela.players.get(msg.guildID as string)?.queue.remove(args[0] as any - 1) as Track[];
      msg.channel.createMessage({
        embed: {
          description: i18next.t('command.remove.removedFromQueue', { trackName: removedTrack[0].title }),
          color: config.color,
          thumbnail: {
            url: removedTrack[0].thumbnail ?? undefined,
          },
        },
      });
    }, {
      description: 'remove certain queue.',
      aliases: [],
      argsRequired: true,
    });
  }

    public category = 'Music'
}
