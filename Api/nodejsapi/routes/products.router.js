const express = require('express');
const router = express.Router();
const productsService = require('../services/products.service');


router.get('/filter', (req, res) => {
  res.send('This is a filter');
});





module.exports = router;