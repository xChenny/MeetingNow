const mongoose = require("mongoose");
const { RoomSchema, UserSchema } = require("../schemas");

const Room = mongoose.model("Room", RoomSchema);
const User = mongoose.model("User", UserSchema);

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
  const { name, description, userId } = params;
  // variable used to see if insertion was successful
  const success = new Promise((resolve, reject) => {
    const newRoom = new Room({ name, description, members: [userId] });
    newRoom.save((err, newR) => {
      if (err) {
        return reject({ err: err.message });
      } else {
        newR.insertionSuccess();
        return resolve({ data: newR });
      }
    });
  });
  return success;
};

const addMemberToRoom = params => {
  const { roomId, userId } = params;
  const success = new Promise(async (resolve, reject) => {
    let room = await Room.findByIdAndUpdate(roomId, {
      $addToSet: { members: [userId] }
    });
    if (!room) {
      reject({ err: "Could not find room." });
    }
    resolve({ data: `User was added to this room!` });
  });
  return success;
};

module.exports = {
  createRoom,
  addMemberToRoom,
  findRoom
};
