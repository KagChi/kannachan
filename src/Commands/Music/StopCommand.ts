import { Command } from "eris";
import config from "../../config";
import KannaClient from "../../Struct/KannaClient";
export default class StopCommand extends Command {
    constructor(public client: KannaClient) {
        super('stop', (msg, args) => {
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
            this.client.erela.players.get(msg.guildID!)?.queue.splice(0, this.client.erela.players.get(msg.guildID!)?.queue.length)
            this.client.erela.players.get(msg.guildID!)!.queue.current = null;
            this.client.erela.players.get(msg.guildID!)?.node.send({
                op: "stop",
                guildId: msg.guildID,
              });
            msg.channel.createMessage({
                embed: {
                    description: '✅ | stop current track & cleared guild queue.',
                    color: config.color
                }
            })
        }, {
            description: 'stop current playing track',
            aliases: ['clear']
        })
    }
    public category = 'Music'
}