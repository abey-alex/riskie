import { createLogger, LogLevel } from 'bunyan'

const logger = createLogger({
    name: 'logger',
    streams: [
        {
            level: (process.env.LOG_LEVEL || 'debug') as LogLevel,
            stream: process.stdout,
        },
    ],
})

export default logger
