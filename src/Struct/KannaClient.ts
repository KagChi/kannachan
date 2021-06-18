import { Manager } from 'erela.js';
import { CommandClient } from 'eris';
import { join } from 'path';
import config from '../config';
import Logger from '../Util/Logger';
import readdirRecursive from '../Util/ReaddirRecursive';
export default class KannaClient extends CommandClient {
    public constructor() {
        super(config.token, {
            intents: ['guildMessages', 'guildVoiceStates', 'guilds', 'guildMessageReactions']
        },{
            prefix: 'k!',
            owner: '499021389572079620',
            ignoreBots: true,
            ignoreSelf: true,
            defaultHelpCommand: false,
        })
    }
    public erela = new Manager({
        nodes: config.nodes,
        send: (id, payload) => {
            const guild = this.guilds.get(id);
            if (guild) guild.shard.sendWS(payload.op, payload.d)
        }
    })
    public loadCommands() {
        for(const files of readdirRecursive(join(__dirname, '..', 'Commands'))) {
            const commandFiles = require(files).default
            const command = new commandFiles(this)
            Logger.info(`registering ${command.label} command with category ${command.category}`)
            const erisCommand = this.registerCommand(command.label, command.execute)
            erisCommand.category = command.category
            erisCommand.client = command.client
            for(const aliases of command.aliases) {
                this.registerCommandAlias(aliases, command.label)
            }
        }
    }
    public login() {
        this.connect()
        this.loadCommands()
    }
}
declare module 'eris' {
    export interface Command {
        category: string,
        client: KannaClient 
    }
}