import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// convert callback scrypt function to async await use
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static compare(storedPassword: string, suppliedPassword: string) {}
}
