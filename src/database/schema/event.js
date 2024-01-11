const mongoose = require("mongoose");

module.exports = mongoose.model("Event", new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  description: { type: String },
  image: { type: String },
  registeredAt: { type: Number, default: Date.now() },
  participants: { type: Array, default: [] },
  //make enum type
  status: { type: String, default: 'pending' },
  date: {
    type: Object,
    default: {
      start: { type: String },
      end: { type: String },
      hours: { type: String },
    }
  }
}));