import { ApolloServer } from 'apollo-server-express'
import resolvers from './resolvers/index.js'
import { MongoClient } from 'mongodb'
import * as fs from 'fs';
import expressPlayground from 'graphql-playground-middleware-express'
import express from 'express';

const graphQLPlayground = expressPlayground.default

var typeDefs = fs.readFileSync('./src/schema.graphql', 'utf-8')

async function start() {
    const app = express()
    const MONGO_DB = "mongodb://127.0.0.1:27017/graphql-test"
    let db 
    try {
        const client = await MongoClient.connect(MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        db = client.db()
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to MongoDB', error)
        process.exit(1)
    }

    const server = new ApolloServer({typeDefs, resolvers, context: {db}})
    await server.start()
    server.applyMiddleware({app})

    app.get('/playground', graphQLPlayground({ endpoint: '/graphql' }))
    app.listen({ port: 4000 }, () => {
        console.log('Apollo Server on http://localhost:4000/playground')
    })
}

start()