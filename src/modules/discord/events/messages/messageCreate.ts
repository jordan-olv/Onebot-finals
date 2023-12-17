const { Collection, ChannelType, Events } = require("discord.js");

import { client } from '../../../../app';

module.exports = {
  name: Events.MessageCreate,

  async execute(message: any) {

    const PREFIX = "!";
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    command.execute(client, message);
  }
};