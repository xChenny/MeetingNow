const mongoose = require("mongoose");
const { RoomSchema, RoomSchema } = require("../schemas");

const Room = mongoose.model("Room", RoomSchema);

/**
 * Given an params object, creates and inserts into mongodb a new member object
 * @param {Object} params: An object of params used to create a new Room Object
 */
const create = async params => {
  const id = await uuidv4();
  params = { id, ...params };

  const newRoom = new Room(params);
  // variable used to see if insertion was successful
  const success = new Promise((resolve, reject) => {
    newRoom.save((err, newMem) => {
      if (err) {
        console.error(err.message);
        reject(false);
      } else {
        newMem.insertionSuccess();
        resolve(true);
      }
    });
  });
  return success;
};

module.exports = {
  create
};
