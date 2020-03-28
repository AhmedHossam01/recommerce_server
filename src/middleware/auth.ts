import jwt from "jsonwebtoken";
require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import throwErr from "../util/errHandler";

export const auth = (roles?: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.token;

      // @ts-ignore
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (roles && roles.includes(decoded.role)) {
        console.log(roles);
        next();
      }

      if (roles && !roles.includes(decoded.role)) {
        return throwErr(401, "Unauthorized", next);
      }

      if (!roles) {
        next();
      }
    } catch (err) {
      throwErr(401, "Auth Failed", next);
    }
  };
};
