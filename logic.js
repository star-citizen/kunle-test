const mongoose = require("mongoose");
const assert = require("assert");

mongoose.Promise = global.Promise; // Allows us to use Native promises without throwing error.
mongoose.connect("mongodb://localhost:27017/kunle-test");
const db = mongoose.connection;

// Converts value to lowercase
function toLower(v) {
  return v.toLowerCase();
}

// Define a device schema
const deviceSchema = mongoose.Schema({
  name: { type: String, set: toLower },
  deviceId: { type: Number },
  status: { type: String, set: toLower },
  range: { type: Number },
});

// Define model as an interface with the database
const Device = mongoose.model("Device", deviceSchema);

/**
 * @function [addDevice]
 * @returns {String} Status
 */
const addDevice = (device) => {
  Device.create(device, (err) => {
    assert.equal(null, err);
    console.info("New device added");
    console.info(device);
    db.close();
  });
};

/**
 * @function [switchStatus]
 * @returns {Json} switch status
 */
const switchStatus = (_id, device) => {
  Device.update({ _id }, device).exec((err, status) => {
    assert.equal(null, err);
    console.info("Updated successfully");
    console.info(status);
    db.close();
  });
};

/**
 * @function [listDevices]
 * @returns {Json} devices
 */
const listDevices = () => {
  Device.find().exec((err, contact) => {
    assert.equal(null, err);
    console.info(contact);
    console.info(`${contact.length} devices`);
    db.close();
  });
};

// Export all methods
module.exports = { addDevice, listDevices, switchStatus };
