const mongoose = require("mongoose");


const guildSchema = new mongoose.Schema({
  guildId: { type: String },
  guildName: { type: String }
});

module.exports = mongoose.model("Member", new mongoose.Schema({
  id: { type: String }, //ID of the user
  name: { type: String },
  guild: {
    type: guildSchema,
    default: {}
  },
  profil: {
    type: Object,
    default: { // The member mute infos
      money: 500, // Money of the user
      exp: 0, // Exp points of the user
      lvl: 0,
    }
  },
  bio: { type: String },
  stats: {
    type: Object,
    default: {
      totalMsg: 0,
      totalParty: 0,
    }
  },
  infos: {
    type: Object,
    default: {
      registeredAt: Date.now(),
    }
  }
}));