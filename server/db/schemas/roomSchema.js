const { Schema } = require("mongoose");
const { schemaError } = require("./variables");

let RoomSchema = new Schema({
  name: {
    type: String,
    required: [true, `${schemaError} Room must have a name`]
  },
  description: {
    type: String,
    required: [true, `${schemaError} Room must have a description`]
  },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

RoomSchema.methods.updateSuccess = function() {
  console.log(
    `[Mongoose Room Schema]: The room named "${
      this.name
    }" has been updated successfully!`
  );
};

RoomSchema.methods.insertionSuccess = function() {
  console.log(
    `[Mongoose Room Schema]: A new room named "${
      this.name
    }" inserted successfully!`
  );
};

module.exports = RoomSchema;
