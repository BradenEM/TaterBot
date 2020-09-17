const User = require("../models/User");
const db = require("../config/database");

module.exports = {
  name: `adduser`,
  description: "Add user to db",
  async execute(msg) {
    if (msg.mentions.users.size != 1) {
      return msg.channel.send("Please tag a user to add them to the db");
    } else {
      try {
        values = msg.mentions.users.map((user) => {
          return [user.id, user.username];
        });

        await User.create({
          discord_id: values[0][0],
          username: values[0][1],
        });
        User.sync();
        msg.channel.send("User added successfully");
      } catch (e) {
        if (e == "SequelizeUniqueConstraintError: Validation error") {
          return msg.channel.send("User already exists");
        } else {
          return msg.channel.send(`ERROR: ${e}`);
        }
      }
    }
  },
};