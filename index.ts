// Load dotenv configurations
import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'
import helmet from 'helmet'
import { ApolloServer } from 'apollo-server-express'

import apiRoutes from 'routes/api'
import transactionModule from 'modules/transactions'
import Json from 'views/json'

dotenv.config()

const isProduction: boolean = process.env.NODE_ENV === 'production'
const host: string = process.env.HOST || `localhost`
const port: string = process.env.PORT || `3001`
const app: Application = express()

app.disable('x-powered-by')
app.use(helmet())

// GraphQL endpoints
const graphServer = new ApolloServer({
    schema: transactionModule.schema,
    playground: true,
    introspection: true,
})
graphServer.applyMiddleware({ app })

// Register API routes
app.use('/api', apiRoutes)

app.use('/', (req: Request, res: Response) => {
    res.redirect('/graphql')
})

app.use(
    (
        err: string,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        return Json(req, res, err)
    },
)

app.listen(port, () => {
    console.info(`✅ Server is up at http://${host}:${port}`)
})
