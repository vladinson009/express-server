import jsonwebtoken, { JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';

export default class JwtPromisify {
  public static async sign(payload: object, secret: string, options?: SignOptions) {
    return new Promise<string>((resolve, reject) => {
      jsonwebtoken.sign(payload, secret, options ?? {}, (err, token) => {
        if (err || !token) return reject(err);
        resolve(token);
      });
    });
  }
  public static async verify<T extends object = JwtPayload>(
    token: string,
    secret: string,
    options?: VerifyOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, secret, options ?? {}, (err, decoded) => {
        if (err || typeof decoded !== 'object' || decoded === null) {
          return reject(new Error('Invalid token payload'));
        }
        resolve(decoded as T);
      });
    });
  }
}
// export const verify = util.promisify(jsonwebtoken.verify);
