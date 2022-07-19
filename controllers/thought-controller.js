const { User, Thought } = require("../models");
const { findOneAndUpdate } = require("../models/User");

const thoughtController = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const data = await Thought.find({}).select("-__v");
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  //   create thought
  async createThought({ params, body }, res) {
    try {
      const data = await Thought.create(body);
      const userData = await User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: data._id } },
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: "No user with this id" });
      }
      res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  //   get thought by id
  async getThoughtById({ params }, res) {
    try {
      const data = await Thought.findOne({ _id: params.id }).select("-__v");
      if (!data) {
        return res
          .status(404)
          .json({ message: "No thought with that id found" });
      }
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  //   update thought
  async updateThought({ params, body }, res) {
    try {
      const data = await Thought.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
      });
      if (!data) {
        return res
          .status(404)
          .json({ message: "No thought found with this id" });
      }
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  //   delete thought
  async removeThought({ params }, res) {
    try {
      const data = await Thought.findOneAndDelete({ _id: params.id });
      if (!data) {
        return res
          .status(404)
          .json({ message: "No thought found with this id" });
      }
      const userData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: params.id } },
        { new: true }
      );
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  //   create a reaction to a thought
  async createReaction({ params, body }, res) {
    try {
      const data = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      );
      if (!data) {
        return res
          .status(404)
          .json({ message: "No thought found with this id" });
      }
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  //   remove reaction
  async removeReaction({ params, body }, res) {
    try {
      const data = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      );
      if (!data) {
        return res
          .status(404)
          .json({ message: "No thought found with this id" });
      }
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },
};

module.exports = thoughtController;
