import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { autoload } from "elysia-autoload";

const PORT = 3000;

const app = new Elysia()
    .use(swagger())
    .use(await autoload())
    .listen(PORT);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export type ElysiaApp = typeof app;