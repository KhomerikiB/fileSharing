const mongoose = require("mongoose");

const ConfirmedSchema = mongoose.Schema({
  files: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "file"
  },
  sendTo: {
    type: String,
    required: true
  },
  sendFrom: {
    type: String,
    required: true
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "4320m" } // remove in 3 days
  }
});
module.exports = mongoose.model("confirm", ConfirmedSchema);
