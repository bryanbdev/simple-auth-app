import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import userRoutes from "./routes/user.js";
import cookieParser from "cookie-parser";

// middleware
const app = express();
app.use(express.json()); // allow request to be readable in json format
app.use(express.urlencoded({ extended: true })); //parse urlencoded request bodies <-- help read form data on post methods
app.use(express.static("public")); // allow to use css/imgs/javascript...etc
app.set("view engine", "ejs"); // set the view engine to ejs
app.use(cookieParser()); // allow us to create cookies in header with data
app.use("/", userRoutes); // access to user routes

const url = process.env.MONGODB_URL;
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to the mongoDB");
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log({ message: `Something went wrong: ${err}` });
  });
