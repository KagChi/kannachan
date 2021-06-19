import KannaClient from './Struct/KannaClient';
import Listenerhandler from './Util/listenerHandler';

const Client = new KannaClient();
Client.login();
new Listenerhandler(Client);
