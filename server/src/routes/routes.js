const { Router } = require('express');

const LogModel = require('../models/LogModel');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to router path: /',
  });
});
router.get('/logs', async (req, res, next) => {
  try {
    const entries = await LogModel.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/logs', async (req, res, next) => {
  try {
    const logEntry = new LogModel(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400);
    }
    next(error);
  }
});

module.exports = router;
