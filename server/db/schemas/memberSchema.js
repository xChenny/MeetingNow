const { Schema } = require("mongoose");
const { schemaError } = require("./variables");

let MemberSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: [true, `${schemaError} Members must have an email`]
  },
  roomId: String,
  id: String
});

MemberSchema.methods.insertionSuccess = function() {
  console.log(
    `[Mongoose MemberSchema]: A new member named "${
      this.name
    }" was successfully added to the db`
  );
};

const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
// validate email is correctly formatted
MemberSchema.path("email").validate(
  email => emailRegex.test(email), // Assuming email has a text attribute
  "The e-mail field cannot be empty."
);

module.exports = MemberSchema;
