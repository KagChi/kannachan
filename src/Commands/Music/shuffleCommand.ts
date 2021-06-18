import { Command } from "eris";
import config from "../../config";
import KannaClient from "../../Struct/KannaClient";
export default class shuffleCommand extends Command {
    constructor(public client: KannaClient) {
        super('shuffle', (msg, args) => {
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
                    }
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
            this.client.erela.players.get(msg.guildID!)?.queue.shuffle()
            msg.channel.createMessage({
                embed: {
                    description: '✅ | shuffled current queue.',
                    color: config.color
                }
            })
        }, {
            description: 'shuffle current queue',
            aliases: []
        })
    }
    public category = 'Music'
}