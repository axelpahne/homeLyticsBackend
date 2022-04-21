const asyncHandler = require('express-async-handler');

const Household = require('../models/householdModel');
const User = require('../models/userModel');

// @desc Get Goals
// @route Get /api/goals
// @access Private
const getHousehold = asyncHandler(async (req, res) => {
  const household = await Household.find({ user: req.user.id });
  res.status(200).json(household);
});

// @desc Set Goals
// @route POST /api/goals
// @access Private
const setHousehold = asyncHandler(async (req, res) => {
  console.log('Set household');
  console.log(req.body);
  if (!req.body.name) {
    res.status(400);

    throw new Error('Please add text field');
  }

  const household = await Household.create({
    text: req.body.name,
    user: req.user.id,
  });
  res.status(200).json(household);
});

// @desc Update Goals
// @route PUT /api/goals/:id
// @access Private
const updateHousehold = asyncHandler(async (req, res) => {
  const household = await Household.findById(req.params.id);

  if (!household) {
    res.status(400);
    throw new Error('Household not found');
  }

  const user = await User.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the goal user
  if (household.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedHousehold = await Household.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({ message: `Update Household ${req.params.id}` });
});

// @desc Delete Goals
// @route DELETE /api/goals:ID
// @access Private
const deleteHousehold = asyncHandler(async (req, res) => {
  const household = await Household.findById(req.params.id);

  if (!household) {
    res.status(400);
    throw new Error('Household not found');
  }

  const user = await User.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the goal user
  if (household.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await household.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getHousehold,
  setHousehold,
  updateHousehold,
  deleteHousehold,
};
