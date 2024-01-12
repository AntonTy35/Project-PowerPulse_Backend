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
      default: 150,
    },
    currentWeight: {
      type: Number,
      default: 35,
    },
    desiredWeight: {
      type: Number,
      default: 35,
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
      default: 2200,
    },
    dailyRateSports: {
      type: Number,
      default: 110,
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
  height: Joi.number(),
  currentWeight: Joi.number(),
  desiredWeight: Joi.number(),
  birthday: Joi.string(),
  blood: Joi.number().valid(1, 2, 3, 4),
  sex: Joi.string().valid("male", "female"),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5),
});

const signinSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).max(16).required(),
});

// const userUpdate = Joi.object({
//   height: Joi.number().required(),
//   weight: Joi.number().required(),
//   age: Joi.number().required(),
// });

// const userUpdateFive = Joi.object({
//   height: Joi.number().required(),
//   weight: Joi.number().required(),
//   age: Joi.number().required(),
//   gender: Joi.string().valid("male", "female"),
//   activity: Joi.number().valid(1, 2, 3, 4, 5),
//   goal: Joi.string().valid(1, 2, 3),
// });

// const userUpdateFiveKeys = Joi.object()
//   .keys({
//     age: userUpdateFive.extract("age").optional(),
//     height: userUpdateFive.extract("height").optional(),
//     weight: userUpdateFive.extract("weight").optional(),
//     gender: userUpdateFive.extract("gender").optional(),
//     activity: userUpdateFive.extract("activity").optional(),
//     goal: userUpdateFive.extract("goal").optional(),
//   })
//   .or("age", "height", "weight", "gender", "activity", "goal");

// const userUpdateGoal = Joi.object({
//   goal: Joi.string().valid("1", "2", "3"),
// });

// const userUpdateWeight = Joi.object({
//   weight: Joi.number().required(),
// });

const userSchemas = {
  signupSchema,
  signinSchema,

  // userUpdate,
  // userUpdateFive,
  // userUpdateFiveKeys,
  // userUpdateGoal,
  // userUpdateWeight,
};

const User = model("user", userSchema);

module.exports = { User, userSchemas };
