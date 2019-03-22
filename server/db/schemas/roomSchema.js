const { Schema } = require("mongoose");

let RoomSchema = new Schema({
  id: String,
  name: String,
  description: String,
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }]
});

RoomSchema.methods.insertionSuccess = () => {
  console.log(`${this.name} inserted successfully!`);
};

module.export = RoomSchema;
