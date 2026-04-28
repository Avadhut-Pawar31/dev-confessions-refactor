const express = require('express');
const router = express.Router();

const confessionController = require('../controllers/confessionController');

router.post('/confessions', confessionController.createConfession);

router.get('/confessions', confessionController.getAllConfessions);

router.get('/confessions/:id', confessionController.getSingleConfession);

router.get(
  '/confessions/category/:cat',
  confessionController.getConfessionsByCategory
);

router.delete('/confessions/:id', confessionController.deleteConfession);

module.exports = router;