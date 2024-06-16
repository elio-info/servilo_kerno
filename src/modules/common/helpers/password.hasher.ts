import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 3);
}

export async function compare(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}
