import UserModel from "../model/user.js";

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  // create errors object ---> will update later if error happens
  let errors = {
    username: "",
    email: "",
    password: "",
  };

  // validation errors
  // check to see if err message property contains the string "user validation failed"
  if (err.message.includes("Users validation failed")) {
    // get values from from array object
    // loop through array
    Object.values(err.errors).forEach(({ properties }) => {
      // update errors object values if error occured
      errors[properties.path] = properties.message;
      console.log(errors);
    });
  }

  // duplicate error code
  if (err.code === 11000) {
    // get the name of the unique duplicate key property "username" or "email"
    console.log(Object.keys(err.keyValue)[0]);
    errors[Object.keys(err.keyValue)[0]] = `This ${
      Object.keys(err.keyValue)[0]
    } already exists. Try again.`;
    console.log(errors);
  }

  return errors;
};

// home page
export const home = async (req, res) => {
  try {
    res.render("pages/home");
  } catch (error) {
    console.log(`OPPPS...SOMETHING WENT WRONG: ${error}`);
  }
};

// register page
export const register = async (req, res) => {
  try {
    res.render("pages/register");
  } catch (error) {
    console.log(`OPPPS...SOMETHING WENT WRONG: ${error}`);
  }
};

// create new user
export const registerUser = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.render("pages/dashboard", {
      user,
      message: `${user.username} successfully registered`,
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

// login page
export const login = async (req, res) => {
  try {
    res.render("pages/login");
  } catch (error) {
    console.log(`OPPPS...SOMETHING WENT WRONG: ${error}`);
  }
};

// user dashboard
export const dashboard = async (req, res) => {
  try {
    res.render("pages/dashboard");
  } catch (error) {
    console.log(`OPPPS...SOMETHING WENT WRONG: ${error}`);
  }
};
