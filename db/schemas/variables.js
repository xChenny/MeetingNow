/************** Error Messages ***********************/

const schemaError = "[Mongoose Schema Error]:";

/************** Success Messages ***********************/

/**
 * Given a type, returns a string indicating success of insertion
 * into mongodb
 *
 * @param {String} type: Either "Member", or "Room"
 */
const insertionSuccess = type => `${type} inserted succesfully!`;

module.exports = {
  schemaError,
  insertionSuccess
};
