import jwt from "jsonwebtoken";
require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import throwErr from "../util/errHandler";

export const auth = (roles?: string[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.token;

    // @ts-ignore
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (roles && roles.includes(decoded.role)) {
      next();
    }

    if (!roles) {
      next();
    }

    if (roles && !roles.includes(decoded.role)) {
      return throwErr(401, "Unauthorized", next);
    }

    /** I was able to do it like this
     * If (user.role >= givenRole) pass
     * انا فاجر اوي يعني
     */
  } catch (err) {
    throwErr(401, "Auth Failed", next);
  }
};
