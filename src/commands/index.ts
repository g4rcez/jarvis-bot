import { BotMiddleware } from "../types/Middleware";
import { cpf } from "./cpf";
import { whois } from "./whois";
import { cep } from "./cep";

export type Command = {
	action: Function;
	event: string;
	pattern: RegExp;
	middlewares?: BotMiddleware[];
};

export const Commands = [
	{
		action: cpf,
		event: "onText",
		pattern: /\/cpfs?(| [1-9][0-9]?)/,
	},
	{
		action: whois,
		event: "onText",
		pattern: /\/whois(| .*)/,
	},
	{
		action: cep,
		event: "onText",
		pattern: /\/cep(| .*)/,
	},
];
