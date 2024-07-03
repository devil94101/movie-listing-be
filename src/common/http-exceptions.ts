import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let errorMessage = '';
    if (status === 404) {
      errorMessage = 'Not Found';
    } else if (typeof exception.response === 'string') {
      errorMessage = exception.response;
    } else if (typeof exception.response.message === 'string') {
      errorMessage = exception.response.message;
    } else {
      errorMessage = exception.response.message[0];
    }
    response.status(status).json({
      status: 'error',
      error: true,
      message: errorMessage,
    });
  }
}
