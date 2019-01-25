import TelegramBot from "node-telegram-bot-api";
import Bot from "./bot";

export type BotConfig = {
    bot: TelegramBot;
};

export const config = {
    bot: Bot,
};
