import bunyan from 'bunyan';

export default bunyan.createLogger({
    name: 'logger',
    streams: [
        {
            level: process.env.LOG_LEVEL || 'debug',
            stream: process.stdout,
        },
    ],
});
