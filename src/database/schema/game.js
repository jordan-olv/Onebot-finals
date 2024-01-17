import mongoose from 'mongoose';
import IGame from '../interfaces/IGame.ts'; // Chemin vers votre interface

module.exports = mongoose.model("Game", new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  description: { type: String },
  image: { type: String },
  color: { type: String },
  messageId: { type: String },
  roleId: { type: String }
}));