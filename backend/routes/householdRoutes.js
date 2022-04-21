const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors());
const {
  getHousehold,
  setHousehold,
  updateHousehold,
  deleteHousehold,
} = require('../controllers/householdController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getHousehold).post(protect, setHousehold);
router
  .route('/:id')
  .delete(protect, deleteHousehold)
  .put(protect, updateHousehold);

module.exports = router;
