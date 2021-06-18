import { EmbedOptions, Command, Member } from "eris";
import config from "../../config";
import KannaClient from "../../Struct/KannaClient";
import { createPaginationEmbed } from 'eris-pagination';
import { chunk } from "../../Util/Chunk";
export default class queueCommand extends Command {
    constructor(public client: KannaClient) {
        super('queue', async (msg, args) => {
            if(!this.client.erela.players.get(msg.guildID!)) {
                msg.channel.createMessage({
                    embed: {
                        description: '⛔ | There no active guild queue.',
                        color: config.color
                    }
                })
                return;
            }
            const embed: EmbedOptions[] = []
            const pages = chunk(this.client.erela.players.get(msg.guildID!)?.queue.map((x: any, i: number, ) => `\`${i + 1}\` ${x.title} [\`${x.requester.user.username}\`]`), 7)
            if(pages.length < 2) {
                msg.channel.createMessage({ embed: {
                    description: `
\`\`\`
Now playing: ${this.client.erela.players.get(msg.guildID!)?.queue.current?.title} [${(this.client.erela.players.get(msg.guildID!)?.queue.current?.requester as Member).user.username}]
\`\`\`
${this.client.erela.players.get(msg.guildID!)?.queue.map((x: any, i: number, ) => `\`${i + 1}\` ${x.title} [\`${x.requester.user.username}\`]`).join("\n")}`,
                    color: config.color,
                    author: {
                        icon_url: msg.member?.guild.iconURL!,
                        name: msg.member?.guild.name! + ' queue list'
                    }
                }})
                return;
            }
            for(const page of pages) {
                embed.push({
                    description: `
                    \`\`\`
Now playing: ${this.client.erela.players.get(msg.guildID!)?.queue.current?.title} [${(this.client.erela.players.get(msg.guildID!)?.queue.current?.requester as Member).user.username}]
\`\`\`
${page.join("\n")}`,
                    color: config.color,
                    author: {
                        icon_url: msg.member?.guild.iconURL!,
                        name: msg.member?.guild.name! + ' queue list'
                    }
                })
            }
            await createPaginationEmbed(msg, embed, {
                extendedButtons: true,
                cycling: true
            })
        }, {
            description: 'get guild queue.',
            aliases: ["q", "np", "nowplay"],
        })
    }
    public category = 'Music'
}