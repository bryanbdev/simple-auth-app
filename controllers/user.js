import UserModel from "../model/user.js";
import jwt from "jsonwebtoken";

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

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect...try again.";
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

// creates web token
// equvialent to 3 days (in seconds)
const maxAge = 3 * 24 * 60 * 60; //3days 24hours 60mintues 60seconds
const createToken = (id) => {
  // first argument ---> pass in the payload => data from backend server
  // second argument ---> create a secret to access & secure the jwt
  // third argument ---> optional object (can expire the jwt)
  return jwt.sign({ id }, "goody", {
    expiresIn: maxAge,
  });
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
    const user = await UserModel.create(req.body); //create user
    const token = createToken(user._id);
    //options -> {httpOnly: true} no can't access the cookie through js frontend
    // options -> {secure: true} cookies are only accessed on https sites
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
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

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    // options -> {httpOnly: true} no can't access the cookie through js frontend
    // options -> {secure: true} cookies are only accessed on https sites
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
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

// handle logout user
export const logout = async (req, res) => {
  try {
    // replace the cookie value will empty string
    // removes the jwt token
    res.cookie("jwt", "", { maxAge: 1 }); // expires in 1 millisecond
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
