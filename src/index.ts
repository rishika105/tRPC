import { createContext } from './server/context.js';
import express from "express"
import * as trpcExpress from "@trpc/server/adapters/express"
import { appRouter } from "./server/index.js";
import { generateOpenApiDocument } from 'trpc-to-openapi';

const app = express();

app.use(express.json())

//make open ai document
const openapiDocument = generateOpenApiDocument(appRouter, {
    baseUrl: 'http://localhost:8000',
    title: 'My todo server',
    version: '1.0.0'
})

app.get('/', (req, res) => {
    return res.json({ status: 'Server is up and running'})
})

app.get("/openapi.json", (req, res) => {
    return res.json(openapiDocument)
})

//if any request is this forward 
app.use('/trpc', trpcExpress.createExpressMiddleware({router: appRouter, createContext}))

app.listen(8000, () => console.log(`Express server is running at PORT 8000 🚀 `))