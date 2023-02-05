import { Logger, transports, format, createLogger } from 'winston';

const writeToFile: boolean = false;

export class RFRLogger {
    private logger: Logger;

    constructor() {
        const myFormat = format.printf(({ level, message, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
        });
        const filename = `./logs/combinedlog.log`;
        console.log(filename);
        this.logger = createLogger({
            level: 'info',
            format: format.combine(
                format.label({ label: '[message]', message: true}),
                format.timestamp(),
                myFormat
            ),
            defaultMeta: { service: 'user-service' },
            transports: 
                writeToFile ? [
                    new transports.Console(),
                    new transports.File({ filename: filename })
                ] :
                [
                    new transports.Console()
                ]
        });
        this.logger.info('Logger initialized');
    }

    log(message: string) {
        this.logger.info(message);
    }
}