import { createLogger, transports } from 'winston';
import { LogtailTransport } from '@logtail/winston';
import { Logtail } from '@logtail/node';

/**
 * Logtail instance used accross the application to log the events.
 */
const logtail = new Logtail(process.env.BETTERSTACK_KEY ?? '', {
  endpoint: 'https://s1259183.eu-nbg-2.betterstackdata.com',
});

// for development environment
const devLogger = {
  transports: [new transports.Console(), new LogtailTransport(logtail)],
};

// for production environment
const prodLogger = {
  transports: [new LogtailTransport(logtail)],
};

// export log instance based on the current environment
const instanceLogger =
  process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

/**
 * Winston logger instance used to log the events in the application.
 */
export const winstionInstance = createLogger(instanceLogger);

/**
 * Flush the logs to logtail.
 */
export const logtailFlush = async () => {
  await logtail.flush();
};
