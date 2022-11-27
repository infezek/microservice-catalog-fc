import { EntityValidationError } from '@fc/core/@seedwork/domain';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { values, union } from 'lodash';
@Catch(EntityValidationError)
export class EntityValidationErrorFilter implements ExceptionFilter {
  catch(exception: EntityValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 422;

    response.status(status).json({
      statusCode: status,
      error: 'Unprocessable Entity',
      message: union(...Object.values(exception.error)),
    });
  }
}
