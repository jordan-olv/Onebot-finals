import { Client } from "discord.js";
import mongoose from "mongoose";
import * as colors from 'colors';



module.exports = (client: Client) => {
  console.log(colors.green("DATABASE] Started connecting to MongoDB..."));
  const mongo = process.env.MONGO;

  if (!mongo) {
    console.log("[WARN] A Mongo URI/URL isn't provided! (Not required)");
  } else {
    mongoose.connect(mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions).catch((e) => console.log(e))

    mongoose.connection.once("open", () => {
      console.log("[DATABASE] Connected to MongoDB!");
    })
    return;
  }
}