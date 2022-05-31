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
      default:
        Math.random().toString(36).substring(2, 10) +
        Math.random().toString(36).substring(2, 10),
    },

    ttl: { type: Number, required: true, default: 1 }, //1 minute,

    isValid: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cache', cacheSchema);
