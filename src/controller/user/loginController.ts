import { Request, Response, NextFunction } from "express";
import throwErr from "../../util/errHandler";
import User from "../../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const loginController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .exec()
    .then((result: any) => {
      if (!result) {
        return throwErr(401, "Username or password is incorrect", next);
      }

      bcrypt
        .compare(password, result.password)
        .then(success => {
          if (!success) {
            throwErr(401, "Username or password is incorrect", next);
          }

          const token = jwt.sign(
            {
              _id: result._id,
              email: result.email
            },
            "process.env.SECRET_KEY",
            {
              expiresIn: "1h"
            }
          );

          res.json({
            token
          });
        })
        .catch(err => throwErr(500, err.message, next));
    })
    .catch(err => throwErr(500, err.message, next));
};
