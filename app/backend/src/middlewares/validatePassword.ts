import { Request, Response, NextFunction } from 'express';

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (password === '') {
    return res.status(400).send({
      message: 'All fields must be filled',
    });
  }
  next();
};

export default validatePassword;
