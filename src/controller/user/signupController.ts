import { Request, Response, NextFunction } from "express";
import throwErr from "../../util/errHandler";
import User from "../../model/user";
import bcrypt from "bcrypt";
import validator from "email-validator";

export const signupController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  const userExists = User.findOne({
    $or: [{ username }, { email }]
  });

  if (userExists) {
    return throwErr(
      412,
      "A user with that username or email address already exist",
      next
    );
  }

  if (password.length < 3 || password.length > 15) {
    throwErr(
      412,
      "Your password cannot be less than 3 or bigger than 15 chars",
      next
    );
  }

  if (username.length < 3 || username.length > 15) {
    throwErr(
      412,
      "Your username cannot be less than 3 or bigger than 15 chars",
      next
    );
  }

  if (!validator.validate(email)) {
    throwErr(412, "Please enter a valid email", next);
  }

  bcrypt
    .hash(password, 10)
    .then(hash => {
      const user = new User({
        name,
        email,
        password: hash
      });
      user
        .save()
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          throwErr(500, err.message, next);
        });
    })
    .catch(err => {
      throwErr(500, err.message, next);
    });
};
