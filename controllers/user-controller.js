const { User } = require("../models");

const userController = {
  // get all users
  async getAllUsers(req, res) {
    try {
      const data = await User.find({});
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  //   get user by Id
  async getUserById({ params }, res) {
    try {
      const data = await User.findOne({ _id: params.id });
      if (!data) {
        return res.status(404).json({ message: "No user found with this id" });
      }
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  //   create User
  async createUser({ body }, res) {
    try {
      const data = await User.create(body);
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  //   update user
  async updateUser({ params, body }, res) {
    try {
      const data = await User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      });
      if (!data) {
        return res.status(404).json({ message: "No user found with this Id" });
      }
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  //   delete User
  async deleteUser({ params }, res) {
    try {
      const data = await User.findOneAndDelete({ _id: params.id });
      if (!data) {
        return res.status(404).json({ message: "No user found with this id" });
      }
      res.json(data);
    } catch (error) {
      console.log(data);
      res.status(400).json(error);
    }
  },

  //   add friend
  async addFriend({ params }, res) {
    try {
      const data = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true }
      );
      if (!data) {
        return res.status(404).json({ message: "No user found with this id" });
      }
      res.json(data);
    } catch (error) {
      console.log(data);
      res.status(400).json(error);
    }
  },

  //   delete friend
  async deleteFriend({ params }, res) {
    try {
      const data = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      );
      if (!data) {
        return res.status(404).json({ message: "No user found with this id" });
      }
      res.json(data);
    } catch (error) {
      console.log(data);
      res.status(400).json(error);
    }
  },
};

module.exports = userController;
