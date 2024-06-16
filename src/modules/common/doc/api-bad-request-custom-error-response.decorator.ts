import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';

export const ApiCustomErrorResponse = (message?: string) => {
  return applyDecorators(
    ApiBadRequestResponse({
      schema: {
        allOf: [
          {
            properties: {
              statusCode: {
                type: 'number',
                default: '400',
              },
              timestamp: {
                type: 'number',
                example: '1693487602148',
              },
              path: { type: 'string', default: 'some/path/route' },
              message: {
                type: 'string',
                example: message || 'The Error Message',
              },
            },
          },
        ],
      },
    }),
  );
};
