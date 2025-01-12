import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { autoload } from "elysia-autoload";
import { rateLimit } from 'elysia-rate-limit'
import { cors } from '@elysiajs/cors'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from "./firebase-config";

const fireapp = initializeApp(firebaseConfig);
const db = getFirestore(fireapp);
const PORT = 3000;

const app = new Elysia()
    .use(cors())
    .use(swagger())
    .use(await autoload())
    .use(rateLimit())
    .state('db', db)
    .listen(PORT);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export type ElysiaApp = typeof app;