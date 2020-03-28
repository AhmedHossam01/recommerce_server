import jwt from "jsonwebtoken";
require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import throwErr from "../util/errHandler";
import User from "../model/user";

export const auth = (roles?: string[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.token;

    // @ts-ignore
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const userRecord = await User.findById(decoded._id);
    // @ts-ignore
    req.currentUser = userRecord;

    if (!userRecord) {
      return throwErr(404, "User not found", next);
    }

    if (roles && roles.includes(decoded.role)) {
      next();
    }

    if (!roles) {
      next();
    }

    if (roles && !roles.includes(decoded.role)) {
      return throwErr(401, "Unauthorized", next);
    }

    /** I can also do it like this (just as refference)
     * If (user.role >= givenRole) pass
     */
  } catch (err) {
    throwErr(401, "Auth Failed", next);
  }
};
