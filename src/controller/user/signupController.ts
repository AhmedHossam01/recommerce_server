import { Request, Response, NextFunction } from "express";
import throwErr from "../../util/errHandler";
import User from "../../model/user";
import bcrypt from "bcrypt";
import validator from "email-validator";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return throwErr(412, "Please fill all required fields", next);
  }

  const userExists = await User.findOne({
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
    return throwErr(
      412,
      "Your password cannot be less than 3 or bigger than 15 chars",
      next
    );
  }

  if (username.length < 3 || username.length > 15) {
    return throwErr(
      412,
      "Your username cannot be less than 3 or bigger than 15 chars",
      next
    );
  }

  if (!validator.validate(email)) {
    return throwErr(412, "Please enter a valid email", next);
  }

  bcrypt
    .hash(password, 10)
    .then(hash => {
      const user = new User({
        username,
        email,
        password: hash
      });
      user
        .save()
        .then((result: any) => {
          res.json({
            request: "Create user",
            status: "success",
            createdUser: {
              username: result.username,
              email: result.email,
              _id: result._id
            }
          });
        })
        .catch(err => {
          throwErr(500, err.message, next);
        });
    })
    .catch(err => {
      throwErr(500, err.message, next);
    });
};
