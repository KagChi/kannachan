import { EmbedOptions, Command, Member } from 'eris';
import { createPaginationEmbed } from 'eris-pagination';
import i18next from 'i18next';
import config from '../../config';
import { GuildDB } from '../../Models/Guild';
import KannaClient from '../../Struct/KannaClient';
import { chunk } from '../../Util/Chunk';
import { findGuild } from '../../Util/Mongoose';

export default class queueCommand extends Command {
  constructor(public client: KannaClient) {
    super('queue', async (msg) => {
      const { lng } = await findGuild(msg.guildID as string) as unknown as GuildDB
      if(!this.client.erela.leastUsedNodes.first()?.connected) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.lavalinkNotConnected', { lng: lng ?? config.defaultLang }),
            color: config.color,
          },
        });
        return;
      }
      if (!this.client.erela.players.get(msg.guildID as string)) {
        msg.channel.createMessage({
          embed: {
            description: i18next.t('utility.music.noActiveGuildQueue', { lng: lng ?? config.defaultLang }),
            color: config.color,
          },
        });
        return;
      }
      const embed: EmbedOptions[] = [];
      const pages = chunk(this.client.erela.players.get(msg.guildID as string)?.queue.map((x: any, i: number) => `\`${i + 1}\` ${x.title} [\`${x.requester.user.username}\`]`), 7);
      if (pages.length < 2) {
        msg.channel.createMessage({
          embed: {
            description: `
\`\`\`
${i18next.t('command.queue.nowPlaying', { lng: lng ?? config.defaultLang })}: ${this.client.erela.players.get(msg.guildID as string)?.queue.current?.title} [${(this.client.erela.players.get(msg.guildID as string)?.queue.current?.requester as Member).user.username}]
\`\`\`
${this.client.erela.players.get(msg.guildID as string)?.queue.map((x: any, i: number) => `\`${i + 1}\` ${x.title} [\`${x.requester.user.username}\`]`).join('\n')}`,
            color: config.color,
            author: {
              icon_url: msg.member?.guild.iconURL ?? undefined ,
              name: `${msg.member?.guild.name} queue list`,
            },
          },
        });
        return;
      }
      for (const page of pages) {
        embed.push({
          description: `
                    \`\`\`
${i18next.t('command.queue.nowPlaying', { lng: lng ?? config.defaultLang })}: ${this.client.erela.players.get(msg.guildID as string)?.queue.current?.title} [${(this.client.erela.players.get(msg.guildID as string)?.queue.current?.requester as Member).user.username}]
\`\`\`
${page.join('\n')}`,
          color: config.color,
          author: {
            icon_url: msg.member?.guild.iconURL ?? undefined,
            name: `${msg.member?.guild.name} queue list`,
          },
        });
      }
      await createPaginationEmbed(msg, embed, {
        extendedButtons: true,
        cycling: true,
      });
    }, {
      description: 'get guild queue.',
      aliases: ['q', 'np', 'nowplay'],
    });
  }

    public category = 'Music'
}
