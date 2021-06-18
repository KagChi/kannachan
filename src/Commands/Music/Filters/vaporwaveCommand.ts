import { Command } from "eris";
import config from "../../../config";
import KannaClient from "../../../Struct/KannaClient";
export default class vaporwaveCommand extends Command {
    constructor(public client: KannaClient) {
        super('vaporwave', (msg, args) => {
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
            this.client.erela.players.get(msg.guildID!)!.node.send({ op: 'filters', guildId: msg.guildID, timescale: { pitch: 0.5 } });
            this.client.erela.players.get(msg.guildID!)?.seek(this.client.erela.players.get(msg.guildID!)?.position!)
            msg.channel.createMessage({
                embed: {
                    description: `✅ | Enabled ${this.label}.`,
                    color: config.color
                }
            })
        }, {
            description: 'vaporwave filters.',
            aliases: []
        })
    }
    public category = 'Filters'
}