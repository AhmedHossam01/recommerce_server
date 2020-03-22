import mongoose from "mongoose";

const { DB_HOST, DB_NAME } = process.env;

const db_init = () => {
  return mongoose
    .connect(`mongodb://${DB_HOST}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("DB OK"))
    .catch(err => console.log(err));
};

export default db_init;
