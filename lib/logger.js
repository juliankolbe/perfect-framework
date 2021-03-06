var winston = require('winston');
var fs = require('fs');
var logDir = 'logs';

winston.emitErrs = true;


// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir);
// }

var tsFormat = () => (new Date()).toLocaleTimeString('de-DE', {hour12: false});

if(process.env.NODE_ENV !== 'testing') {
  var logger = new winston.Logger({
      transports: [
          // new winston.transports.File({
          //     level: 'info',
          //     filename: './'+logDir+'/all-logs.log',
          //     handleExceptions: true,
          //     json: true,
          //     maxsize: 5242880, //5MB
          //     maxFiles: 5,
          //     colorize: false,
          //     timestamp: tsFormat
          // }),
          new winston.transports.Console({
              level: 'debug',
              handleExceptions: false,
              prettyPrint: true,
              json: false,
              colorize: true,
              timestamp: tsFormat
          })
          // new (require('winston-daily-rotate-file'))({
          //   level: 'info',
          //   filename: `/usr/src/${logDir}/-all-logs.log`,
          //   handleExceptions: true,
          //   json: false,
          //   maxsize: 5242880, // 5mb
          //   maxFiles: 5,
          //   timestamp: tsFormat,
          //   datePattern: 'dd-MM-yyyy',
          //   prepend: true
          // //  level: env === 'development' ? 'verbose' : 'info'
          // })
      ],
      exitOnError: false
  });
}
else {
  var logger = new winston.Logger({
      transports: []
  });
}



module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message.slice(0, -1));
    }
};
