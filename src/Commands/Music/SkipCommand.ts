import { Command } from "eris";
import config from "../../config";
import KannaClient from "../../Struct/KannaClient";
export default class SkipCommand extends Command {
    constructor(public client: KannaClient) {
        super('skip', (msg, args) => {
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
            this.client.erela.players.get(msg.guildID!)?.stop()
            msg.channel.createMessage({
                embed: {
                    description: '✅ | Skipped current track.',
                    color: config.color
                }
            })
        }, {
            description: 'skip current playing track',
            aliases: ['s']
        })
    }
    public category = 'Music'
}