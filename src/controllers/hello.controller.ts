import type { Request, Response } from 'express';

export const getHello = async (req: Request, res: Response) => {
  return res.status(200).send('Hello World!');
};
