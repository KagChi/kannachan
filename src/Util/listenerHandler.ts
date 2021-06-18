import KannaClient from "../Struct/KannaClient";
import { readdirSync } from "fs";
export default class Listenerhandler {
    constructor(public client: KannaClient) {
        const clientEvents = readdirSync("./dist/Listeners/Client");
        for (const event of clientEvents) {
            const file = require(`../Listeners/Client/${event}`).default;
            const listener = new file(client)
            client.on(event.split(".")[0], (...args) => listener.run(...args));
          }
        const erelaEvents = readdirSync("./dist/Listeners/Erela");
          for (const event of erelaEvents) {
              const file = require(`../Listeners/Erela/${event}`).default;
              const listener = new file(client)
              client.erela.on(event.split(".")[0] as any, (...args) => listener.run(...args));
            }
     }
}