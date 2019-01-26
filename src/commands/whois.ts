import { flat, brazilize } from "sidekicker";
import { Message } from "node-telegram-bot-api";
import bot from "../config/bot";

const Whois = require("whois");

function lineParser(line: string, pattern: string) {
	if (line.match(new RegExp(`^${pattern}`))) {
		return line
			.trim()
			.split(`${pattern}`)[1]
			.trim();
	}
	return false;
}

const checks = {
	domain: (line: string) => lineParser(line, "domain:"),
	status: (line: string) => lineParser(line, "status:"),
	responsible: (line: string) => brazilize(`${lineParser(line, "responsible:")}`),
	created: (line: string) => lineParser(line, "created:"),
	changed: (line: string) => lineParser(line, "changed:"),
	owner: (line: string) => brazilize(`${lineParser(line, "owner:")}`),
	ownerid: (line: string) => lineParser(line, "ownerid:"),
	person: (line: string) => lineParser(line, "person:"),
	nserver: (line: string) => lineParser(line, "c:"),
	"e-mail": (line: string) => lineParser(line, "e-mail:"),
};

export function whois(msg: Message) {
	const chatId = msg.chat.id;
	let param = msg.text || "github.com";
	param = param.split(" ")[1];
	if (param.match(/^https?:\/\//)) {
		param = param.replace("https://", "").replace("http://", "");
	}
	console.log(param);
	Whois.lookup(param, function(err: any, data: string) {
		if (!err) {
			const objWhois = data.split("\n").reduce((acc: object, line: string) => {
				if (line.match(/: /g)) {
					const check = line.split(":")[0].trim();
					try {
						// @ts-ignore
						const value = acc[check];
						if (value) {
							// @ts-ignore
							return { ...acc, [check]: flat([value, checks[check](line)]) };
						}
						// @ts-ignore
						return { ...acc, [check]: checks[check](line) };
					} catch (error) {
						return acc;
					}
				}
				return acc;
			}, {});
			console.log(objWhois);
			bot.sendMessage(chatId, JSON.stringify(objWhois, null, 4));
		}
	});
}
