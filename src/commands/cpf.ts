import { Message } from "node-telegram-bot-api";
import { config } from "../config";
import { mod, random, arrLenght } from "../utils/Number";

const { bot } = config;

function generateCpf(mask: boolean = true) {
	const n = 9;
	const [n1, n2, n3, n4, n5, n6, n7, n8, n9] = arrLenght(n, () => random(n));
	let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
	d1 = 11 - mod(d1, 11);
	if (d1 >= 10) {
		d1 = 0;
	}
	let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
	d2 = 11 - mod(d2, 11);
	if (d2 >= 10) {
		d2 = 0;
	}
	if (mask) {
		return `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`;
	}
	return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
}

export function cpf(msg: Message) {
	const chatId = msg.chat.id;
	const param = msg.text || " 10";
	return bot.sendMessage(
		chatId,
		Array(Number.parseInt(param.split(" ")[1], 10) || 10)
			.fill(10)
			.map(() => generateCpf())
			.join()
			.replace(/,/g, "\n"),
	);
}
