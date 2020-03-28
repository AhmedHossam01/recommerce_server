import jwt from "jsonwebtoken";
require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import throwErr from "../util/errHandler";
import User from "../model/user";

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

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers.token;
  const userRecord = await User.findById(token.id);

  // @ts-ignore
  req.currentUser = userRecord;

  if (!userRecord) {
    return throwErr(401, "User not found", next);
  } else {
    return next();
  }
};
