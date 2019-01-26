import axios, { AxiosResponse } from "axios";
import { Message } from "node-telegram-bot-api";
import bot from "../config/bot";

const baseUrl = "https://api.postmon.com.br/v1/cep/";

function getCep(cep: string) {
	return axios.get(`${baseUrl}${cep}`).then((response: AxiosResponse) => {
		return JSON.stringify(response.data, null, 4);
	});
}

export function cep(msg: Message) {
	const chatId = msg.chat.id;
	let param = msg.text || "04715-005";
	param = param.split(" ")[1].trim();
	if (param.match(/^[0-9]{5}(|-| )[0-9]{3}/)) {
		return getCep(param.replace(/\D+/, "")).then((x: string) => {
			return bot.sendMessage(chatId, x);
		});
	}
	return "";
}
