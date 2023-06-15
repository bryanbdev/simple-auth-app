import UserModel from "../model/user.js";

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
    console.log(`OPPPS...SOMETHING WENT WRONG: ${error}`);
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
