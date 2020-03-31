const { Router } = require('express');

const LogModel = require('../models/LogModel');

const { ACCESS_KEY } = process.env;

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
    if (req.get('X-API-KEY') !== ACCESS_KEY) {
      console.log('i am here');
      res.status(401);
      throw Error('You are not authorised');
    }
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
// delete a specific post
router.delete('/logs/:entryId', async (req, res, next) => {
  try {
    console.log(req.body);
    const deletePost = await LogModel.remove({ _id: req.params.entryId });
    res.json(deletePost);
  } catch (error) {
    res.status(418);
    next(error);
  }
}); // update a specific post
router.patch('/logs/:entryId', async (req, res, next) => {
  try {
    const updatedPost = await LogModel.updateOne(
      { _id: req.params.entryId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          image: req.body.image,
          visitDate: req.body.visitDate,
        },
      },
    );
    res.send(updatedPost);
  } catch (error) {
    console.log('yo');
    res.status(418);
    next(error);
  }
});

module.exports = router;
