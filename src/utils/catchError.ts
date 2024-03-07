import { NextFunction, Request, Response } from "express";

function catchError(cb) {
  return (req: Request, res: Response, next: any) => {
    cb(req, res, next).catch(next);
  };
}
export { catchError };
