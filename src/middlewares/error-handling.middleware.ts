import { NextFunction, Request, Response } from "express";

const errorHandling = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({
    message:
      err.response?.message ||
      err.message ||
      "We have problem trying your request, please try again",
  });
};

export default errorHandling;
