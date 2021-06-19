import { Command } from 'eris';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';

export default class skiptoCommand extends Command {
  constructor(public client: KannaClient) {
    super('skipto', async (msg, args) => {
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
      if (isNaN(args[0] as any)) {
        msg.channel.createMessage({
          embed: {
            description: '⛔ | Not a valid number.',
            color: config.color,
          },
        });
        return;
      } if (Number(args[0]) > (this.client.erela.players.get(msg.guildID as string)?.queue.length as number)) {
        msg.channel.createMessage({
          embed: {
            description: '⛔ | Cannot skip more than queue length.',
            color: config.color,
          },
        });
        return;
      }
      this.client.erela.players.get(msg.guildID as string as string)?.stop(Number(args[0]));
    }, {
      description: 'skip to certain queue.',
      aliases: ['sto'],
      argsRequired: true,
    });
  }

    public category = 'Music'
}
