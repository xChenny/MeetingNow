const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { UserSchema } = require("../db/schemas/index");

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = mongoose.model("User", UserSchema);

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Match User
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered"
            });
          }

          // Match Password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password Incorrect" });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
  );

  // JWT
  passport.use(
    // When requesting to a protected route, when using JWT,
    // you need a header of the form:
    // key: Authorization
    // value: Bearer <jwt token>
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "secretkey"
      },
      (jwtPayload, done) => {
        //find the user in db if needed. may not be necessary if
        // you store everything you need in JWT payload.
        return (
          User.findById(jwtPayload._id)
            // found user
            .then(user => {
              return done(null, user);
            })
            // error
            .catch(err => {
              return done(err, false);
            })
        );
      }
    )
  );
};
