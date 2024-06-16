import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';

export const ApiNotFoundCustomErrorResponse = (objectType: string) => {
  return applyDecorators(
    ApiNotFoundResponse({
      schema: {
        allOf: [
          {
            properties: {
              statusCode: {
                type: 'number',
                default: '404',
              },
              timestamp: {
                type: 'number',
                example: '1693487602148',
              },
              path: { type: 'string', default: 'some/path/route' },
              message: {
                type: 'string',
                example: `Object of type ${objectType} not found`,
              },
            },
          },
        ],
      },
    }),
  );
};
