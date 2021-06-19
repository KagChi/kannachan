import { Command } from 'eris';
import config from '../../../config';
import KannaClient from '../../../Struct/KannaClient';

export default class clearfiltersCommand extends Command {
  constructor(public client: KannaClient) {
    super('clearfilters', (msg) => {
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
            this.client.erela.players.get(msg.guildID as string)?.node.send({
              op: 'filters', guildId: msg.guildID, equalizer: [], karaoke: null, timescale: null, tremolo: null, vibrato: null, rotation: null, distortion: null,
            });
            this.client.erela.players.get(msg.guildID as string)?.seek(this.client.erela.players.get(msg.guildID as string)?.position as number);
            msg.channel.createMessage({
              embed: {
                description: '✅ | cleared filters.',
                color: config.color,
              },
            });
    }, {
      description: 'clear filters.',
      aliases: [],
    });
  }

    public category = 'Filters'
}
