import KannaClient from "../../Struct/KannaClient";
import Logger from "../../Util/Logger";

export default class listener {
    constructor(public client: KannaClient) { }
    public run() {
        Logger.info(`client ready with ${this.client.guilds.size} guilds.`)
        this.client.erela.init(this.client.user.id)
        this.client.editStatus('dnd', { name: 'k!help for info.'})
    }
}