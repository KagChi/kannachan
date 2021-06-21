import { Command } from 'eris';
import i18next from 'i18next';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';

export default class loopCommand extends Command {
  constructor(public client: KannaClient) {
    super('loop', (msg, args) => {
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
      const type = args.join(' ');
      switch (type) {
        case 'track': {
          msg.channel.createMessage({
            embed: {
              description: i18next.t('command.loop.loopTrack'),
              color: config.color,
            },
          });
          this.client.erela.players.get(msg.guildID as string)?.setTrackRepeat(true);
          return;
        }
        case 'song': {
          msg.channel.createMessage({
            embed: {
              description: i18next.t('command.loop.loopTrack'),
              color: config.color,
            },
          });
          this.client.erela.players.get(msg.guildID as string)?.setTrackRepeat(true);
          return;
        }
        case 'queue': {
          msg.channel.createMessage({
            embed: {
              description: i18next.t('command.loop.loopQueue'),
              color: config.color,
            },
          });
          this.client.erela.players.get(msg.guildID as string)?.setQueueRepeat(true);
          return;
        }
        case 'all': {
          msg.channel.createMessage({
            embed: {
              description: i18next.t('command.loop.loopQueue'),
              color: config.color,
            },
          });
          this.client.erela.players.get(msg.guildID as string)?.setQueueRepeat(true);
          return;
        }
        case 'off': {
          msg.channel.createMessage({
            embed: {
              description: i18next.t('command.loop.loopOff'),
              color: config.color,
            },
          });
          this.client.erela.players.get(msg.guildID as string)?.setTrackRepeat(false);
          this.client.erela.players.get(msg.guildID as string)?.setQueueRepeat(false);
          return;
        }
        default: {
          msg.channel.createMessage({
            embed: {
              description: '✅ | looping queue.',
              color: config.color,
            },
          });
          this.client.erela.players.get(msg.guildID as string)?.setQueueRepeat(true);
        }
      }
    }, {
      description: 'loop queue/track.',
      aliases: [],
      argsRequired: true,
    });
  }

    public category = 'Music'
}
