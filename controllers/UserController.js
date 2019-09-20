const mongoose = require("mongoose");
const User = require("../models/User");
const helpers = require("../common/helpers");
const bcrypt = require("bcrypt");
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

  async update(req, res, _id, body) {
    body = JSON.parse(body);
    let { name, email, password, isAdmin } = body;
    let user;
    let newUserData = {};
    try {
      user = await User.get({ _id });
    } catch (err) {
      console.log(err);
    }

    if (!user) {
      helpers.error(res, "User Not Found", 404);
    }

    if (name) {
      newUserData.name = name;
    }
    if (isAdmin) {
      newUserData.isAdmin = isAdmin;
    }
    if (email) {
      newUserData.email = email;
    }
    if (password) {
      newUserData.password = password;
    }

    try {
      const newUpdatedUser = await User.findOneAndUpdate(
        { _id },
        { $set: newUserData },
        { new: true }
      );

      return helpers.success(res, newUpdatedUser);
    } catch (err) {
      if (err.name === "ValidationError") {
        return helpers.validationError(res, err);
      } else if (err.message.indexOf("duplicate key error") !== -1) {
        return helpers.validationError(res, "Email already exist");
      } else {
        return helpers.error(res, err);
      }
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
    bcrypt.hash(password, 10, async (err, hash) => {
      try {
        const user = await User.create({ name, email, password: hash });
        return helpers.success(res, user);
      } catch (err) {
        if (err.name === "ValidationError") {
          return helpers.validationError(res, err);
        } else if (err.message.indexOf("duplicate key error") !== -1) {
          return helpers.error(res, "Email already exists");
        } else return helpers.error(res);
      }
    });
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
