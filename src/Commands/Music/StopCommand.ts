import { Player } from 'erela.js';
import { Command } from 'eris';
import i18next from 'i18next';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';

export default class StopCommand extends Command {
  constructor(public client: KannaClient) {
    super('stop', (msg) => {
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
      this.client.erela.players.get(msg.guildID as string)?.queue.splice(0, this.client.erela.players.get(msg.guildID as string)?.queue.length);
            (this.client.erela.players.get(msg.guildID as string) as Player).queue.current = null;
            this.client.erela.players.get(msg.guildID as string)?.node.send({
              op: 'stop',
              guildId: msg.guildID,
            });
            msg.channel.createMessage({
              embed: {
                description: i18next.t('command.stop.stopped'),
                color: config.color,
              },
            });
    }, {
      description: 'stop current playing track',
      aliases: ['clear'],
    });
  }

    public category = 'Music'
}
