import { Command } from 'eris';
import config from '../../config';
import KannaClient from '../../Struct/KannaClient';
import i18next from 'i18next';
import { GuildDB } from '../../Models/Guild';
import { findGuild } from '../../Util/Mongoose';
export default class HelpCommand extends Command {
  constructor(public client: KannaClient) {
    super('help', async (msg, args) => {
      const { lng } = await findGuild(msg.guildID as string) as unknown as GuildDB
      const argument = args.join();
      if (argument) {
        const command = client.commands[argument];
        if (command) {
          msg.channel.createMessage({
            embed: {
              fields: [
                {
                  name: `❯ ${i18next.t('command.help.description', { lng: lng ?? config.defaultLang })}:`,
                  value: command.description,
                }, {
                  name: `❯ ${i18next.t('command.help.aliases', { lng: lng ?? config.defaultLang })}:`,
                  value: command.aliases.join(', '),
                }, {
                  name: `❯ ${i18next.t('command.help.cooldown', { lng: lng ?? config.defaultLang })}:`,
                  value: `${command.cooldown} (s)`,
                },
              ],
              color: config.color,
            },
          });
          return;
        }
      }
      const fields = [];
      const categories = [...new Set(Object.values(this.client.commands).map((x) => x.category))];
      for (const category of categories) {
        const commands = Object.values(this.client.commands).filter((x) => x.category === category);
        fields.push({
          name: `${category} [\`${commands.length}\`]`,
          value: commands.map((x) => `\`${x.label}\``).join(', '),
        });
      }
      fields.push({
          name: i18next.t('command.help.links', { lng: lng ?? config.defaultLang }),
          value: "[Github](https://github.com/KagChi/kannachan) | [Invite](https://discord.com/oauth2/authorize?client_id=726379535184166943&scope=bot&permissions=0)"
      });
      msg.channel.createMessage({
        embed: {
          description: i18next.t('command.help.embedMessage', { prefix: config.prefix, username: this.client.user.username, lng: lng ?? config.defaultLang }),
          fields,
          thumbnail: {
            url: this.client.user.avatarURL,
          },
          color: config.color,
        },
      });
    }, {
      description: 'get the bot help command.',
      aliases: ['h', 'halp'],
    });
  }

    public category = 'Util'
}
