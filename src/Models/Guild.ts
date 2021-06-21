import { Schema, model } from 'mongoose';
import config from '../config';
export default model('Guild', new Schema({
    id: { type: String },
    lng: { type: String, default: config.defaultLang },
    prefix: { type: String, default: config.prefix }
}))

export interface GuildDB {
    id: string;
    lng: string;
    prefix: string;
}