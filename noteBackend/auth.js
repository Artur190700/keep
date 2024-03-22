const express = require('express');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('./middleware/auth');

router.get('/me', auth, async (req, res) => {
  res.send({ username: req.user.username });
});


router.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
    res.status(201).send({ username: user.username, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await user.checkPassword(req.body.password))) {
      throw new Error();
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
    res.send({ username: user.username, token });
  } catch (error) {
    res.status(400).send('Invalid credentials');
  }
});

module.exports = router;
