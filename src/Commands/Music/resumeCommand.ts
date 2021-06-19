import { Command } from 'eris';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';

export default class resumeCommand extends Command {
  constructor(public client: KannaClient) {
    super('resume', (msg) => {
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
      this.client.erela.players.get(msg.guildID as string)?.pause(false);
      msg.channel.createMessage({
        embed: {
          description: '✅ | Resumed current track.',
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
