import jwt from "jsonwebtoken";
import UserModel from "../model/user.js";

// create own middleware to handle user auth for private routes
export const requireAuth = (req, res, next) => {
  // req.cookies.[name_of_cookie] ---> get access to cookie value
  const token = req.cookies.jwt; // grabs the token from jwt

  // check if json webtoken exist & is verified
  if (token) {
    jwt.verify(token, "goody", (err, decodedToken) => {
      // check if error, if so redirect to login page
      // have a token but it's not valid/or been tampered with
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next(); // goes to the next middleware which is the user dashboard route
      }
    });
  } else {
    res.redirect("/login");
  }
};

// create middleware to check current user
export const checkUser = (req, res, next) => {
  // get token from cookies
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "goody", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        // users doesn't exist on locals it will throw error must set to null
        res.locals.user = null; // will check for value inside view later on (conditional rendering)
        next(); // theres no user logged b/c token is not valid... goes to next middleware
      } else {
        console.log(decodedToken); // contains payload (data inside token) from token
        let user = await UserModel.findById(decodedToken.id); // get user id from db using the id inside token
        // create a property on locals called "user"
        res.locals.user = user; // allow use to inject data inside our views on frontend
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
