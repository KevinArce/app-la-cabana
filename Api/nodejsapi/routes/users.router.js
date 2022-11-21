const express = require('express');
const usersService = require('../services/users.service');

const router = express.Router();

router.get('/a', (req, res) => {
  res.send('Hello World!');
});

router.get('/users',(req, res) => {
  const users = usersService.getUsers();
  users.then((data) => {
    res.json(data[0]);
  });
});

// Create a login route to authenticate users
router.post('/auth', (req, res) => {
  const { name, password } = req.body;
  if (name && password) {
    res.json({
      name,
      password,
    });
  } else {
    res.json({
      error: 'Name and password are not required',
    });
  }
})

module.exports = router;