import { Player, Track } from "erela.js";
import { Member } from "eris";
import config from "../../config";
import KannaClient from "../../Struct/KannaClient";

export default class listener {
    constructor(public client: KannaClient) { }
    public async run(player: Player, track: Track) {
        const msg = await this.client.createMessage(player.textChannel!, {
            embed: {
                description: `▶ | Now playing \`${track.title}\` \`[${(track.requester as Member).user.username}]\``,
                thumbnail: {
                    url: track.thumbnail!
                },
                color: config.color
            }
        })
        setTimeout(() => {
            msg.delete()
        }, track.duration)
    }
}