const mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    val: {
      type: String || Number,
      required: true,
    },

    valid_till: { type: Date, expires: '15s', default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cache', cacheSchema);
