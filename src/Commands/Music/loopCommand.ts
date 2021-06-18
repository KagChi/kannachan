import { Command } from "eris";
import config from "../../config";
import KannaClient from "../../Struct/KannaClient";
export default class loopCommand extends Command {
    constructor(public client: KannaClient) {
        super('loop', (msg, args) => {
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
            const type = args.join(" ")
            switch (type) {
                case 'track': {
                    msg.channel.createMessage({
                        embed: {
                            description: '✅ | looping track.',
                            color: config.color
                        }
                    })
                    this.client.erela.players.get(msg.guildID!)?.setTrackRepeat(true)
                    return;
                }
                case 'song': {
                    msg.channel.createMessage({
                        embed: {
                            description: '✅ | looping track.',
                            color: config.color
                        }
                    })
                    this.client.erela.players.get(msg.guildID!)?.setTrackRepeat(true)
                    return;
                }
                case 'queue': {
                    msg.channel.createMessage({
                        embed: {
                            description: '✅ | looping queue.',
                            color: config.color
                        }
                    })
                    this.client.erela.players.get(msg.guildID!)?.setQueueRepeat(true)
                    return;
                }
                case 'all': {
                    msg.channel.createMessage({
                        embed: {
                            description: '✅ | looping queue.',
                            color: config.color
                        }
                    })
                    this.client.erela.players.get(msg.guildID!)?.setQueueRepeat(true)
                    return;
                }
                case 'off': {
                    msg.channel.createMessage({
                        embed: {
                            description: '✅ | disabled queue.',
                            color: config.color
                        }
                    })
                    this.client.erela.players.get(msg.guildID!)?.setTrackRepeat(false)
                    this.client.erela.players.get(msg.guildID!)?.setQueueRepeat(false)
                    return;
                }
                default: {
                    msg.channel.createMessage({
                        embed: {
                            description: '✅ | looping queue.',
                            color: config.color
                        }
                    })
                    this.client.erela.players.get(msg.guildID!)?.setQueueRepeat(true)
                    return;
                }
            }
        }, {
            description: 'loop queue/track.',
            aliases: [],
            argsRequired: true
        })
    }
    public category = 'Music'
}