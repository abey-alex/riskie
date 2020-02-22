// Load dotenv configurations
import dotenv from 'dotenv'
import express, { Application } from 'express'
import helmet from 'helmet'

import apiRoutes from 'routes/api'

dotenv.config()

const isProduction: boolean = process.env.NODE_ENV === 'production'
const host: string = process.env.HOST || `localhost`
const port: string = process.env.PORT || `3001`
const app: Application = express()

app.disable('x-powered-by')
app.use(helmet())


// Register API routes
app.use('/api', apiRoutes)

app.use(
    (
        err: string,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        if (!isProduction) {
            return res.status(500).send(err)
        }

        return res.sendStatus(500)
    },
)

app.listen(port, () => {
    console.info(`✅ Server is up at http://${host}:${port}`)
})
