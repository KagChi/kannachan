import { VoicePacket } from 'erela.js';
import KannaClient from '../../Struct/KannaClient';

export default class listener {
  constructor(public client: KannaClient) { }
  public type = 'on';
  public emitter = 'client';
  public event = 'rawWS';
  public run(packet: VoicePacket) {
    this.client.erela.updateVoiceState(packet);
  }
}
