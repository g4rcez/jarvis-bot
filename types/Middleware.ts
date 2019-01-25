import { Message } from "node-telegram-bot-api";

export type BotMiddleware = (msg: Message, match: RegExpExecArray | null) => Function;
