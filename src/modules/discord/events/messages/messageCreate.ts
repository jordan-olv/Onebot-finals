const { Collection, ChannelType, Events } = require("discord.js");

import { client } from '../../../../app';

module.exports = {
  name: Events.MessageCreate,

  async execute(message: any) {

    const command = client.commands.get("test");
    console.log(message);
  }
};