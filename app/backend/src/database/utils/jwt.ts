import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

export const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

abstract class TokenValidate {
  static tokenAssign = (token: {
    email: string, password: string, role: string,
  }): string => (jwt.sign(token, SECRET, { expiresIn: '1d' }));

  static verifyToken = (token: string, secret: string): jwt.JwtPayload =>
    jwt.verify(token, secret) as jwt.JwtPayload;
}

export default TokenValidate;
