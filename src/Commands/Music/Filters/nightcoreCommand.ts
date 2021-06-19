import { Command } from 'eris';
import config from '../../../config';
import KannaClient from '../../../Struct/KannaClient';

export default class nightcoreCommand extends Command {
  constructor(public client: KannaClient) {
    super('nightcore', (msg) => {
      if(!this.client.erela.leastUsedNodes.first()?.connected) {
        msg.channel.createMessage({
          embed: {
            description: '⛔ | Lavalink node not connected.',
            color: config.color,
          },
        });
        return;
      }
      if (!this.client.erela.players.get(msg.guildID as string)) {
        msg.channel.createMessage({
          embed: {
            description: '⛔ | There no active guild queue.',
            color: config.color,
          },
        });
        return;
      }
      if (!msg.member?.voiceState.channelID) {
        msg.channel.createMessage({
          embed: {
            description: '⛔ | You must on voice to do this.',
            color: config.color,
          },
        });
        return;
      }
      if (this.client.erela.players.get(msg.guildID as string) && this.client.erela.players.get(msg.guildID as string)?.voiceChannel && msg.member.voiceState.channelID !== this.client.erela.players.get(msg.guildID as string)?.voiceChannel) {
        msg.channel.createMessage({
          embed: {
            description: '⛔ | You must on voice same as me to do this.',
            color: config.color,
          },
        });
        return;
      }
            this.client.erela.players.get(msg.guildID as string)?.node.send({ op: 'filters', guildId: msg.guildID, timescale: { pitch: 1.2, speed: 1.2, rate: 1 } });
            this.client.erela.players.get(msg.guildID as string)?.seek(this.client.erela.players.get(msg.guildID as string)?.position as number);
            msg.channel.createMessage({
              embed: {
                description: `✅ | Enabled ${this.label}.`,
                color: config.color,
              },
            });
    }, {
      description: 'nightcore filters.',
      aliases: ['nc'],
    });
  }

    public category = 'Filters'
}
