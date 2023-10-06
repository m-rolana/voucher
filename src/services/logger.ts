import { createLogger, format, transports, addColors, Logger } from 'winston';

const { combine, errors, timestamp, colorize, printf } = format;

addColors({
    error: 'red bold',
    warn: 'yellow bold',
    info: 'cyan',
    debug: 'green bold',
});

const logger = createLogger({
    level: 'debug',
    format: combine(
        errors({ stack: true }),
        colorize({
            all: true,
        }),
        timestamp(),
        printf((info) => {
            const { level, message, timestamp, stack } = info;
            const stackLog = stack ? '\n' + stack : '';
            return `[${timestamp}] ${level}: ${message} ${stackLog}`;
        }),
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        // new transports.File({ filename: 'error.log', level: 'error' }),
        // new transports.File({ filename: 'combined.log' }),
        new transports.Console(),
    ],
});

export default logger;
export interface ILogger extends Logger {}
