import { Command } from 'eris';
import i18next from 'i18next';
import config from '../../../config';
import KannaClient from '../../../Struct/KannaClient';

export default class EightDCommand extends Command {
  constructor(public client: KannaClient) {
    super('8D', (msg) => {
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
            this.client.erela.players.get(msg.guildID as string)?.node.send({
              op: 'filters',
              guildId: msg.guildID,
              rotation: {
                rotationHz: 0.2,
              },
            });
            this.client.erela.players.get(msg.guildID as string)?.seek(this.client.erela.players.get(msg.guildID as string)?.position as number);
            msg.channel.createMessage({
              embed: {
                description: i18next.t('command.filters.enabledFilters', { filters: this.label }),
                color: config.color,
              },
            });
    }, {
      description: '8D filters.',
      aliases: [],
    });
  }

    public category = 'Filters'
}
