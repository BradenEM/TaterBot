const User = require("../models/User");

module.exports = {
  name: `adduser`,
  description: "Add user to db",
  async execute(msg) {
    values = msg.mentions.users.map((user) => {
      return [user.id, user.username];
    });

    if (msg.mentions.users.size != 1) {
      return msg.channel.send("Please tag a user to add them to the db");
    } else {
      try {
        await User.create({
          discord_id: parseInt(values[0][0]),
          username: values[0][1],
        });
        await User.sync();
        return msg.channel.send("User added successfully");
      } catch (e) {
        // if (e == "SequelizeUniqueConstraintError: Validation error") {
        console.log(e);
        console.log(values[0][0]);
        return msg.channel.send("shat");
        // } else {
        // return msg.channel.send(`ERROR: ${e}`);
        // }
      }
    }
  },
};
