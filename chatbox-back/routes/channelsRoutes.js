const express = require('express');
const { addChannel, allChannels, oneChannel } = require('../controllers/channelControllers');
const router = express.Router();

router.post('/newChannel', addChannel )

router.get('/', allChannels )

router.get('/:id', oneChannel)


module.exports = router