import { VoicePacket } from "erela.js";
import KannaClient from "../../Struct/KannaClient";

export default class listener {
    constructor(public client: KannaClient) { }
    public run(packet: VoicePacket) {
        this.client.erela.updateVoiceState(packet)
    }
}