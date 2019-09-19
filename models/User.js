const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BM = require("./BaseModel");

const userSchema = new Schema(
  {
    // name
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: "{VALUE} is not a valid email!"
      }
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.method("toClient", _ => {
  const user = this.toObject();

  // delete user._id;
  // delete user.deleteAt;
  // delete user.createdAt;
  // delete user.updateAt;
  return user;
});

const userModel = BM.model("users", userSchema);

class User {
  static create(data) {
    const newUser = new userModel(data);
    return new Promise((resolve, reject) => {
      const error = newUser.validateSync();
      if (error) {
        reject(error, "inaine error");
      }

      newUser.save((err, obj) => {
        if (obj) {
          resolve(obj);
        } else {
          console.log("err");
          reject(err);
        }
      });
    });
  }

  // Get All Users
  static getAll(conditions, selecParams) {
    return new Promise((resolve, reject) => {
      const query = userModel.find({});
      if (selecParams) {
        query.select(selecParams);
      }
      query.lean().exec((err, docs) => {
        if (docs) {
          resolve(docs);
        } else {
          reject(err);
        }
      });
    });
  }

  // Get One User
  static get(conditions, selecParams) {
    return new Promise((resolve, reject) => {
      const query = userModel.findOne(conditions);
      if (selecParams) {
        query.select(selecParams);
      }

      query.lean().exec((err, docs) => {
        if (docs) {
          resolve(docs);
        } else {
          reject(err);
        }
      });
    });
  }

  // Delete /users/:id
  static delete(conditions, selecParams) {
    return new Promise((resolve, reject) => {
      const query = userModel.findByIdAndDelete(conditions);
      if (selecParams) {
        query.select(selecParams);
      }

      query.lean().exec((err, ok) => {
        if (ok) {
          resolve(ok);
        } else {
          reject(err);
        }
      });
    });
  }
}

module.exports = User;
