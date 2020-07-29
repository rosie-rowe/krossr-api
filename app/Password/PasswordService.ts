import * as crypto from 'crypto';
import { User } from '../models/UserModel';
import { injectable } from 'inversify';

@injectable()
export class PasswordService {
    authenticate(user: User, password: string) {
        return this.encryptPassword(password, user.salt) === user.hashedPassword;
    }

    setPassword(user: User, password: string) {
        let salt = this.makeSalt();

        let hashedPassword = this.encryptPassword(password, salt);

        if (hashedPassword) {
            user.provider = 'local';
            user.salt = salt;
            user.hashedPassword = hashedPassword;
        }
    }

    private encryptPassword(password: string, salt: string) {
        if (!password || !salt) {
            return '';
        }
        let saltBuffer = Buffer.from(salt, 'base64');
        return crypto.pbkdf2Sync(password, saltBuffer, 10000, 64, null).toString('base64');
    }

    private makeSalt() {
        return crypto.randomBytes(16).toString('base64');
    }
}
