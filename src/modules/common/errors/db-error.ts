import { BadRequestException, ConflictException } from '@nestjs/common';

/** Traduce un error de Mongo a una excepción HTTP: 409 si es clave duplicada, 400 en otro caso */
export function dbErrorToHttp(error: unknown, duplicatedMessage: string, fallbackMessage: string): Error {
  const err = error as { code?: number; message?: string };
  return err?.code === 11000
    ? new ConflictException(duplicatedMessage)
    : new BadRequestException(err?.message ?? fallbackMessage);
}
