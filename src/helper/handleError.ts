import { Response } from 'express';

function handleError(res: Response, status: number, errorMessage) {
  res.status(status).send(errorMessage);
}

export { handleError };
