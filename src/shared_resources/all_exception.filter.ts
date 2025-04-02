import { Catch, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { logtailFlush } from './winston.logger';

/**
 * Global exception filter to handle all exceptions in the application.
 * It will log the exception and flush the logs to logtail.
 */
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);
  catch(exception, host) {
    this.logger.error(exception);
    logtailFlush();
    super.catch(exception, host);
  }
}
