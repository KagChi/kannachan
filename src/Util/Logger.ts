export default class Logger {
    constructor() { }
    public static info(message: string) {
        console.log(`%c[INFO]: %c${message.toUpperCase()}`, 'color: #F98404', 'color: #FFC996')
    }
    public static warn(message: string) {
        console.log(`%c[WARN]: %c${message.toUpperCase()}`)
    }
    public static error(message: string) {
        console.log(`%c[ERROR]: %c${message.toUpperCase()}`)
    }
}