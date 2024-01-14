const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { isBefore, differenceInYears } = require("date-fns");

const { handleMongooseError } = require("../helpers");

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name for user"],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    height: {
      type: Number,
      default: 0,
    },
    currentWeight: {
      type: Number,
      default: 0,
    },
    desiredWeight: {
      type: Number,
      default: 0,
    },
    // birthday: {
    //   type: Date,
    //   required: [true, "must be older than 18 years"],
    //   default: "01.01.1989",
    // },
    birthday: {
      type: Date,
      validate: {
        validator: function (birthday) {
          return (
            isBefore(birthday, new Date()) &&
            differenceInYears(new Date(), birthday) >= 18
          );
        },
        message: "The user must be over 18 years old.",
      },
    },

    blood: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: "1",
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    levelActivity: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
    },
    token: {
      type: String,
      default: null,
    },
    BMR: {
      type: Number,
      default: 0,
    },
    dailyRateSports: {
      type: Number,
      default: 0,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: true,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: null,
    },
    confirmationOfVerification: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleMongooseError);

const signupSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(16).required(),
});

const currentSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().pattern(emailRegex).required(),
  height: Joi.number().min(150).required(),
  currentWeight: Joi.number().min(35).required(),
  desiredWeight: Joi.number().min(35).required(),
  birthday: Joi.string().required(),
  blood: Joi.number().valid(1, 2, 3, 4).required(),
  sex: Joi.string().valid("male", "female").required(),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required(),
});

const signinSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(16).required(),
});

const userSchemas = {
  signupSchema,
  signinSchema,
  currentSchema,
};

const User = model("user", userSchema);

module.exports = { User, userSchemas };
