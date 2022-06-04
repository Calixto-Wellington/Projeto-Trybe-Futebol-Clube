import { Request, Response, NextFunction } from 'express';

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (email === '') {
    return res.status(400).send({
      message: 'All fields must be filled',
    });
  }
  next();
};

export default validateEmail;
