import cors from 'cors';
import { createContext } from './server/context.js';
import express from "express"
import * as trpcExpress from "@trpc/server/adapters/express"
import { appRouter } from "./server/index.js";
import { generateOpenApiDocument, createOpenApiExpressMiddleware } from 'trpc-to-openapi';
import fs from 'fs/promises';

const app = express();

app.use(express.json())
app.use(cors());

//make open ai document
const openapiDocument = generateOpenApiDocument(appRouter, {
    baseUrl: 'http://localhost:8000/api',
    title: 'My todo server',
    version: '1.0.0'
})

//write the file
//open this in requestly(open ai specification) and u will get all the requests
//You will literally getttt alll the request to testttt directlyyy no writing it !!!!!!!
fs.writeFile('./openapi-specification.json', JSON.stringify(openapiDocument))

app.get('/', (req, res) => {
    return res.json({ status: 'Server is up and running' })
})

//access docs here
app.get("/openapi.json", (req, res) => {
    return res.json(openapiDocument)
})

//mounting
app.use('/api', createOpenApiExpressMiddleware({
    router: appRouter,
    createContext
}))

//if any request is this forward 
app.use('/trpc', trpcExpress.createExpressMiddleware({ router: appRouter, createContext }))

app.listen(8000, () => console.log(`Express server is running at PORT 8000 🚀 `))