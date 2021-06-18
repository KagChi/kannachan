import { Command } from "eris";
import KannaClient from "../../Struct/KannaClient";
export default class PingCommand extends Command {
    constructor(public client: KannaClient) {
        super('ping', (msg, args) => {
            msg.channel.createMessage(':ping_pong: | Pong!')
        }, {
            description: 'ping pong with the bot',
            aliases: []
        })
    }
    public category = 'Util'
}