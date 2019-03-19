const mongoose = require("mongoose");
const { MemberSchema } = require("../schemas");
const uuidv4 = require("uuid/v4");

const Member = mongoose.model("Member", MemberSchema);

/**
 * Given an params object, creates and inserts into mongodb a new member object
 * @param {Object} params: An object of params used to create a new Member Object
 */
const add = async params => {
  const id = await uuidv4();
  params = { id, ...params };

  const newMember = new Member(params);
  // variable used to see if insertion was successful
  const success = new Promise((resolve, reject) => {
    newMember.save((err, newMem) => {
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
  add
};
