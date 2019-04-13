const { Schema } = require("mongoose");
const { schemaError } = require("./variables");

let UserSchema = new Schema({
  name: {
    type: String,
    required: [true, `${schemaError} User must have an email`]
  },
  email: {
    type: String,
    required: [true, `${schemaError} User must have an email`]
  },
  password: {
    type: String,
    required: [true, `${schemaError} User must have a password`]
  },
  rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }]
});

UserSchema.methods.insertionSuccess = function() {
  console.log(
    `[Mongoose UserSchema]: A new member named "${
      this.name
    }" was successfully added to the db`
  );
};

const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
// validate email is correctly formatted
UserSchema.path("email").validate(
  email => emailRegex.test(email), // Assuming email has a text attribute
  "Email is invalid."
);

module.exports = UserSchema;
