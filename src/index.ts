import { Message } from "node-telegram-bot-api";
import { Command, Commands } from "./commands";
import { config } from "./config";

const { bot } = config;

Commands.forEach((x: Command) => {
	if (!x.middlewares) {
		bot[x.event](x.pattern, x.action);
	}
});

// Grep all the things to make a little zueira
bot.on("message", (msg: Message) => {
	const chatId = msg.chat.id;
	if (`${msg.text}`.match(/.*python.*/gi)) {
		bot.sendMessage(chatId, "Não fala Python, seu cuzão");
	}
});
