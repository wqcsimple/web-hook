/**
 * @author whis admin@wwhis.com
 * @Created 10/17/18
 */
var winston = require('winston');
var date = require('locutus/php/datetime/date');
var Config = require('../config');
const { format} = require('winston');
const { combine, timestamp, printf } = format;

var logger;

const myFormat = printf(info => {
    return `${date('Y-m-d H:i:s O', new Date().getTime() / 1000)} [${info.level}]: ${info.message}`;
});

function initLogger() {
    if (!logger) {
        // logger = new (winston.Logger)({
        //     transports: [
        //         new winston.transports.Console({
        //             level: Config.LOG_LEVEL,
        //             colorize: true,
        //             timestamp: function () {
        //                 return date('Y-m-d H:i:s O', new Date().getTime() / 1000);
        //             },
        //         })
        //     ]
        // });
        logger = winston.createLogger({
            level: Config.LOG_LEVEL,
            format: combine(
                winston.format.colorize(),
                timestamp(),
                myFormat
            ),
            transports: [
                new winston.transports.Console()
            ]
        });
    }
}

function log(level, arguments) {
    // args.unshift(date('Y-m-d H:i:s O', new Date().getTime() / 1000));
    // console.log.apply(null, args);

    initLogger();
    arguments.unshift(level);
    logger.log.apply(logger, arguments);
}

function debug() {
    var args = Array.prototype.slice.call(arguments);
    log('debug', args)
}

function info() {
    var args = Array.prototype.slice.call(arguments);
    log('info', args)
}

function warn() {
    var args = Array.prototype.slice.call(arguments);
    log('warn', args)
}

function error() {
    var args = Array.prototype.slice.call(arguments);
    log('error', args)
}

function trace() {
    var args = Array.prototype.slice.call(arguments);
    log('silly', args)
}

module.exports = {
    log: log,

    trace: trace,
    t: trace,

    debug: debug,
    d: debug,

    info: info,
    i: info,

    warn: warn,
    w: warn,

    error: error,
    e: error,


};
