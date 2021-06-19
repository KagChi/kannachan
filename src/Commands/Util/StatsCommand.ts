import { Command } from 'eris';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';

export default class StatsCommand extends Command {
  constructor(public client: KannaClient) {
    super('stats', (msg) => {
      msg.channel.createMessage({
        embed: {
          description: `
\`\`\`
• Guilds: ${this.client.guilds.size}
• Users: ${this.client.guilds.map((x) => x.memberCount).reduce((a: any, b: any) => b + a).toLocaleString()} (${this.client.users.size.toLocaleString()} Cached)
• Playing Players: ${this.client.erela.players.size}     
• Eris Version: ${require('../../../package.json').dependencies.eris.split('^')[1]}
• Version: ${require('../../../package.json').version}
• Node.JS Version: ${process.version}
• Uptime: ${require('ms')(this.client.uptime)}
\`\`\`
                `,
          thumbnail: {
            url: this.client.user.dynamicAvatarURL(),
          },
          color: config.color,
        },
      });
    }, {
      description: 'get the bot statistic(s)',
      aliases: [],
    });
  }

    public category = 'Util'
}
