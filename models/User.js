const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "Please enter a username",
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: "Please enter an email",
      match: [/.+@.+\..+/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  //   return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
