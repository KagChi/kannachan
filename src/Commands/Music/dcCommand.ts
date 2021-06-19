import { Command } from 'eris';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';

export default class dcCommand extends Command {
  constructor(public client: KannaClient) {
    super('dc', (msg) => {
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
      this.client.erela.players.get(msg.guildID as string)?.destroy();
      msg.channel.createMessage({
        embed: {
          description: '✅ | disconnected.',
          color: config.color,
        },
      });
    }, {
      description: 'disconnect from voice.',
      aliases: ['destroy'],
    });
  }

    public category = 'Music'
}
