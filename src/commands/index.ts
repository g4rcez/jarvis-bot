import { BotMiddleware } from "../../types/Middleware";
import { cpf } from "./cpf";

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
];
