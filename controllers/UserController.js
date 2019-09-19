const mongoose = require("mongoose");
const User = require("../models/User");
const helpers = require("../common/helpers");

class UserController {
  // GET /users
  async index(req, res) {
    try {
      const selectParams = null;

      const users = await User.getAll({}, selectParams);

      return helpers.success(res, users);
    } catch (err) {
      return helpers.error(res, error);
    }
  }

  // GET /users/:id
  async show(req, res, _id) {
    try {
      const user = await User.get({ _id });
      console.log(user);
      return helpers.success(res, user);
    } catch (err) {
      return helpers.error(res);
    }
  }

  async delete(req, res, _id) {
    let user;
    try {
      user = await User.get({ _id });
    } catch (err) {
      console.log(err);
    }

    if (!user) {
      return helpers.error(res, "User not found!", 404);
    }
    try {
      const user = await User.delete({ _id });
      return helpers.success(res, { message: "User successfully deleted" });
    } catch (err) {
      return helpers.error(res);
    }
  }

  async create(req, res, param, body) {
    body = JSON.parse(body);
    let { name, email, password } = body;
    try {
      const user = await User.create({ name, email, password });
      return helpers.success(res, user);
    } catch (err) {
      if (err.name === "ValidationError") {
        return helpers.validationError(res, err);
      } else if (err.message.indexOf("duplicate key error") !== -1) {
        return helpers.error(res, "Email already exists");
      } else return helpers.error(res);
    }
  }
  // // GET /users/:id
  // async show(req, res) {
  //   try {
  //     const user = await User.get();
  //     return helpers.success(res, user);
  //   } catch (err) {
  //     return helpers.error(res, error);
  //   }
  // }
}

module.exports = new UserController();
