require('dotenv').config()
const { AuthenticationError } = require('apollo-server-express');
const Pet = require("../models/Pet")
const User = require("../models/User")
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { _id }) => await User.findById(_id).populate('pets'),
    users: async () => await User.find({}).populate('pets'),
    pets: async (parent, { _id }) => {
      const params = _id ? { _id } : {}
      return await Pet.find(params)
    },
   pet: async (parent,  {petId }) => {
     return Pet.findOne({ _id: petId});
   },
   me: async (parent, args, context) => {
    if (context.user) {
      return User.findOne({ _id: context.user._id }).populate('pets');
    }
    throw new AuthenticationError('You need to be logged in!');
  }, 
  },
  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isPasswordCorrect(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addPet: async (parent, args, context) => {
      if (context.user) {
        const pet = await Pet.create({
          name: args.name,
          type: args.type,
          breed: args.breed,
          location: args.location,
          description: args.description,
          image: args.image,
          link: args.link,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pets: pet._id } }
        );
        return pet;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removePet: async (parent, { userId, petId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { pets: { _id: petId } } },
        { new: true }
      );
    },
  }
};




module.exports = resolvers;