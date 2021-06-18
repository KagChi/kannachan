import { Command } from "eris";
import config from "../../config";
import KannaClient from "../../Struct/KannaClient";
export default class removeCommand extends Command {
    constructor(public client: KannaClient) {
        super('remove', async (msg, args) => {
            if(!this.client.erela.players.get(msg.guildID!)) {
                msg.channel.createMessage({
                    embed: {
                        description: '⛔ | There no active guild queue.',
                        color: config.color
                    }
                })
                return;
            }
            if(!msg.member?.voiceState.channelID) {
                msg.channel.createMessage({
                    embed: {
                        description: '⛔ | You must on voice to do this.',
                        color: config.color
                    },
                })
                return;
            }
            if(this.client.erela.players.get(msg.guildID!) && this.client.erela.players.get(msg.guildID!)?.voiceChannel && msg.member.voiceState.channelID !== this.client.erela.players.get(msg.guildID!)?.voiceChannel) {
                msg.channel.createMessage({
                    embed: {
                        description: '⛔ | You must on voice same as me to do this.',
                        color: config.color
                    }
                })
                return;
            }
            if(isNaN(args[0] as any)) {
                msg.channel.createMessage({
                    embed: {
                        description: '⛔ | Not a valid number.',
                        color: config.color
                    }
                })
                return;
            }
            if(Number(args[0]) > this.client.erela.players.get(msg.guildID!)?.queue.length!) {
                msg.channel.createMessage({
                    embed: {
                        description: '⛔ | Cannot remove more than queue length.',
                        color: config.color
                    }
                })
                return;
            }
            const removedTrack = this.client.erela.players.get(msg.guildID!)?.queue.remove(args[0] as any - 1)
            msg.channel.createMessage({
                embed: {
                    description: `✅ | removed \`${removedTrack![0].title}\` from queue `,
                    color: config.color,
                    thumbnail: {
                        url: removedTrack![0].thumbnail!
                    }
                }
            })
            return;
        }, {
            description: 'remove certain queue.',
            aliases: [],
            argsRequired: true
        })
    }
    public category = 'Music'
}