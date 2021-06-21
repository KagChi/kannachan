import KannaClient from './Struct/KannaClient';
import Listenerhandler from './Util/listenerHandler';
import './Util/i18n';
const Client = new KannaClient();
Client.login();
new Listenerhandler(Client);
