// ANCHOR: Imports
import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import db_init from "./db_init";
import cors from "cors";

// ANCHOR: Initializations
const port = process.env.PORT || 5050;
const app: Application = express();
db_init();
app.listen(port, () => console.log("SERVER OK"));

// ANCHOR: Public Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ANCHOR: API Links

// ANCHOR: Error Handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send({
    error: err
  });
});

/**
 * TODO: test error handling manually
 * TODO: setup automatd tests with jest
 */
