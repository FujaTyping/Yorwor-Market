import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { autoload } from "elysia-autoload";
import { rateLimit } from 'elysia-rate-limit'
import { cors } from '@elysiajs/cors'

const PORT = 3000;

const app = new Elysia()
    .use(cors())
    .use(swagger())
    .use(await autoload())
    .use(rateLimit())
    .listen(PORT);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export type ElysiaApp = typeof app;