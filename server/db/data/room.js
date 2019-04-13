const mongoose = require("mongoose");
const { RoomSchema } = require("../schemas");

const Room = mongoose.model("Room", RoomSchema);

/**
 * Given an id, find a room that matches the requirement
 * @param {object} query
 */
const findRoom = async id => {
  const room = await Room.findById(id);
  if (!room) {
    return { err: "Room not found" };
  } else {
    return { data: room };
  }
};

/**
 * Given an params object, creates and inserts into mongodb a new member object
 * @param {Object} params: An object of params used to create a new Room Object
 */
const createRoom = params => {
  const { name, description } = params;
  // variable used to see if insertion was successful
  const success = new Promise((resolve, reject) => {
    const newRoom = new Room({ name, description });
    console.log(newRoom);
    newRoom.save((err, newR) => {
      if (err) {
        console.error(err.message);
        reject({ err: err.message });
      } else {
        newR.insertionSuccess();
        resolve({ data: newR });
      }
    });
  });
  return success;
};

module.exports = {
  createRoom,
  findRoom
};
