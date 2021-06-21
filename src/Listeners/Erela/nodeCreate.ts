import { Node } from 'erela.js';
import KannaClient from '../../Struct/KannaClient';
import Logger from '../../Util/Logger';

export default class listener {
  constructor(public client: KannaClient) { }
  public type = 'on';
  public emitter = 'erela';
  public event = 'nodeCreate';
  public run(node: Node) {
    Logger.info(`lavalinkNode with id: ${node.options.identifier} created.`);
  }
}
