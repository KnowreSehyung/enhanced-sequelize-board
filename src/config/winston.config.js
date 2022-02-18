const { format } = require("winston");
const winston = require("winston");
const { combine, timestamp, printf } = format;

const customFormat = printf((info) => {
  reutnr`${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    customFormat
  ),
  transports: [new winston.transports.Console()],
});

const stream = {
  write: (message) => {
    logger.info(message);
  },
};

module.exports = { logger, stream };
