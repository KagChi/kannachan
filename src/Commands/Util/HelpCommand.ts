import { Command } from "eris";
import config from "../../config";
import KannaClient from "../../Struct/KannaClient";
export default class HelpCommand extends Command {
    constructor(public client: KannaClient) {
        super('help', (msg, args) => {
            const argument = args.join();
            if(argument) {
                const command = client.commands[argument]
                if(command) {
                    msg.channel.createMessage({ embed: {
                        fields: [
                            {
                                name: "❯ Description:",
                                value: command.description,
                            },{
                                name: "❯ Aliases:",
                                value: command.aliases.join(", ")
                            },{
                                name: "❯ Cooldown:",
                                value: `${command.cooldown} (s)`
                            },
                        ],
                        color: config.color
                    }
                })
                return;
                }
            }
            const fields = []
            const categories = [...new Set(Object.values(this.client.commands).map(x => x.category))];
            for (const category of categories) {
                const commands = Object.values(this.client.commands).filter(x => x.category === category);
                fields.push({
                    name: `${category} [\`${commands.length}\`]`,
                    value: commands.map(x => `\`${x.label}\``).join(", ")
                });
            }
            msg.channel.createMessage({ embed: {
                description: `❯ ${this.client.user.username} command's
                **A list of available commands.**
                For additional info on a command, type \`k!help [command]\``,
                fields,
                thumbnail: {
                    url: this.client.user.avatarURL
                },
                color: config.color
            }})
        }, {
            description: 'get the bot help command.',
            aliases: ['h', 'halp']
        })
    }
    public category = 'Util'
}