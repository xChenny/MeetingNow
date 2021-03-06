const mongoose = require("mongoose");
const { UserSchema } = require("../schemas");
const bcrypt = require("bcryptjs");

const User = mongoose.model("User", UserSchema);

const saltRounds = 10;

/**
 * Given a query, find a user that matches the requirement
 * @param {object} query
 */
const findUser = async query => {
  const user = await User.findOne(query);
  if (!user) {
    return { err: "User not found" };
  } else {
    return { data: user };
  }
};

/**
 * Given an params object, creates and inserts into mongodb a new member object
 * @param {Object} params: An object of params used to create a new Member Object
 */
const createUser = body => {
  const { name, email, password, password2 } = body;
  // I validate the presence of these field when
  // I insert document, so no need to do so here
  // validate passwords match
  if (password !== password2) {
    throw { err: "Passwords must match" };
  }
  const success = new Promise(async (resolve, reject) => {
    // validate email is used or not
    const userWithSameEmail = await findUser({ email });
    if (userWithSameEmail.data !== undefined) {
      return reject({
        err: "There is already a user with that email address."
      });
    }
    const params = { name, email, password };
    if (!name || !name || !password) {
      return reject({ err: "Missing arguments" });
    }
    // generate password hash
    bcrypt.genSalt(saltRounds, (err, salt) =>
      bcrypt.hash(params.password, salt, (error, hash) => {
        if (error) {
          return reject({ err: error });
        }
        params.password = hash;
        // create new user doc
        const newUser = new User(params);
        // save new user doc to mongodb
        newUser.save((err, newUsr) => {
          if (err) {
            return reject({ err: err.message });
          } else {
            newUsr.insertionSuccess();
            return resolve({ data: newUsr });
          }
        });
      })
    );
  });
  return success;
};

module.exports = {
  createUser,
  findUser
};
