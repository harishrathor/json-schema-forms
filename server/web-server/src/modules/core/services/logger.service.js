
import AbstractService from '@coreModule/base/abstract.service';
import winston from 'winston';
import path from 'path';


export default class LoggerService extends AbstractService {

    initialize() {
        super.initialize();
      /*  const loggerFilePath = path.join(SERVER.paths.ROOT, 'loggs', `combined.log`);
        const exceptionFilePath = path.join(SERVER.paths.ROOT, 'loggs', `exceptions.log`);
         this.logger = winston.createLogger({
            levels: winston.config.syslog.levels,
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: loggerFilePath
                })
            ],
            exceptionHandlers: [
                new winston.transports.File({ filename: exceptionFilePath })
            ]
          }); */
    }

    log(type, ...restMessages) {
        console.log.apply(console, restMessages);
        return this;
    }

    logError(error) {
        console.error(error);
        return this;
    }

    logInfo() {
        console.info.apply(console, arguments);
        return this;
    }

    logWarn() {
        console.warn.apply(console, arguments);
        return this;
    }

}

export {
    LoggerService
};
        