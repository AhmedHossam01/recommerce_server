import { Request, Response, NextFunction } from "express";
import throwErr from "../../util/errHandler";
import User from "../../model/user";
require("dotenv").config();

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const id = req.currentUser._id;

  User.findById(id)
    .populate("orderes")
    .exec()
    .then(user => {
      res.json(user);
    })
    .catch(err => throwErr(500, err.message, next));
};
