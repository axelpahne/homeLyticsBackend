const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());
const {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoal).post(protect, setGoal);
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = router;
