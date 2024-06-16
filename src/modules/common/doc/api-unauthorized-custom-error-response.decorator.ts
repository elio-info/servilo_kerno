import { applyDecorators } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ApiUnauthorizedCustomErrorResponse = (description?: string) => {
  return applyDecorators(
    ApiUnauthorizedResponse({
      schema: {
        allOf: [
          {
            properties: {
              statusCode: {
                type: 'number',
                default: '401',
              },
              timestamp: {
                type: 'number',
                example: '1693487602148',
              },
              path: { type: 'string', default: 'some/path/route' },
              message: {
                type: 'string',
                example: 'Unauthorized',
              },
            },
          },
        ],
      },
      description,
    }),
  );
};
