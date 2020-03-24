// ANCHOR: Imports
import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import db_init from "./db_init";
import cors from "cors";
import productsRouter from "./api/productsRouter";
import throwErr, { handleErr } from "./util/errHandler";

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
app.use("/products", productsRouter);

// ANCHOR: Error Handling
app.all("*", (req, res, next) => {
  throwErr(404, "Route not found", next);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  handleErr(err, res);
});
