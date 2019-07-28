const mongoose = require("mongoose");
const FilesSchema = mongoose.Schema({
  files: [
    {
      filename: {
        type: String,
        required: true
      },
      originalname: {
        type: String,
        required: true
      }
    }
  ],
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "4320m" } // remove in 3 days
  }
});

module.exports = mongoose.model("file", FilesSchema);
