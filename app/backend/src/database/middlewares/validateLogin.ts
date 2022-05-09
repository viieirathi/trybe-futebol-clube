import { NextFunction, Request, Response } from 'express';
import * as joi from 'joi';

const loginValidat = joi.object({
  email: joi.string().email().required().empty('')
    .messages({
      'string.email': '401|Incorrect email or password',
      'any.required': '400|All fields must be filled',
    }),
  password: joi.string().min(7).required().empty('')
    .messages({
      'string.min': '401|Incorrect email or password',
      'any.required': '400|All fields must be filled',
    }),
});

const isValid = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { error } = loginValidat.validate({ email, password });
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  next();
};

export default isValid;
