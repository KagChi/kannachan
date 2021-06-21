import KannaClient from './Struct/KannaClient';
import Listenerhandler from './Util/listenerHandler';
import './Util/i18n';
import './Util/Mongoose';

const Client = new KannaClient();
Client.login();
new Listenerhandler(Client);
