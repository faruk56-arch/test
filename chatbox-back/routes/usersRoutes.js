const express = require('express');
const router = express.Router();

const {addUser, login} = require('../controllers/UserControllers')


router.post('/addUser', addUser, (req, res) => {
    res.json('/addUser router post ok ')
})

router.post('/login', login)


module.exports = router
