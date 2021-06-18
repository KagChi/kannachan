import { Player } from "erela.js";
import { Command } from "eris";
import config from "../../config";
import KannaClient from "../../Struct/KannaClient";

export default class PlayCommand extends Command {
    constructor(public client: KannaClient) {
        super('play', async (msg, args) => {
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
            const { loadType, tracks, playlist } = await this.client.erela.search(args.join(" "), msg.member);
            if(loadType === "LOAD_FAILED") {
                msg.channel.createMessage({
                    embed: {
                        description: '⛔ | An error occured when loading the track.',
                        color: config.color
                    }
                })
                return;
            } else if(loadType === "NO_MATCHES") {
                msg.channel.createMessage({
                    embed: {
                        description: '⛔ | No results found with given argument.',
                        color: config.color
                    }
                })
                return;
            }
            const player = new Player({
                voiceChannel: msg.member.voiceState.channelID,
                textChannel: msg.channel.id,
                guild: msg.guildID!,
                volume: 100
            })

            if(!player.voiceChannel) player.setVoiceChannel(msg.member.voiceState.channelID);
            if (player.state !== 'CONNECTED') player.connect();

            if(loadType === "PLAYLIST_LOADED") {
                if (player.state !== 'CONNECTED') player.connect();
                player.queue.add(tracks)
                msg.channel.createMessage({
                    embed: {
                        description: `✅ | Added \`${playlist?.name}\` to queue | | \`[${msg.author.username}]\``,
                        color: config.color,
                        thumbnail: {
                            url: tracks[0].thumbnail!
                        }
                    }
                })
                if (!player.playing && !player.paused && player.queue.totalSize === tracks.length) player.play();
                return;
            } else {
                if (player.state !== 'CONNECTED') player.connect();
                player.queue.add(tracks[0]);
                msg.channel.createMessage({
                    embed: {
                        description: `✅ | Added \`${tracks[0].title}\` to queue | \`[${msg.author.username}]\``,
                        color: config.color,
                        thumbnail: {
                            url: tracks[0].thumbnail!
                        }
                    }
                })
            }
            if (!player.playing && !player.paused && !player.queue.size) return player.play();
        }, {
            description: 'play music.',
            aliases: ['p'],
            argsRequired: true
        })
    }
    public category = 'Music'
}