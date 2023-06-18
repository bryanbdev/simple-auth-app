import jwt from "jsonwebtoken";

// create own middleware to hanlde user auth for private routes
const requireAuth = (req, res, next) => {
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

export default requireAuth;
