const mongoose = require('mongoose');

const householdSchema = mongoose.Schema(
  {
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    ],

    text: {
      type: String,
      required: [false, 'Please add a text value'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Household', householdSchema);
