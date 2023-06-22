import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { IllegalArgumentException } from '../application/exceptions/IllegalArgumentException';

/**
 * Global-scoped filter that is used across the whole application, for every controller and every route handler.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof IllegalArgumentException) {
      response.status(HttpStatus.BAD_REQUEST).json({
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      });
      return;
    }
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      message: (exception as { message: string }).message,
    });
  }
}
