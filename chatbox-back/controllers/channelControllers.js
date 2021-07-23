
const channelModel = require('../models/channelModel')

const addChannel = async (req, res) => {

    try {

        const infoChannel = req.body

        console.log("infoChannel: ", infoChannel);

        const channel = await channelModel.find({ name: infoChannel.name })

        console.log("channel: ", channel);

        const newChannel = {
            name: infoChannel.name,
            users: infoChannel.users,
            creationDate: Date.now()
        }

        if (channel[0] === undefined) {

            await channelModel.create(newChannel)

            res.status(200).json("channel created")

        }

        res.status(400).json('channel already exist')

    } catch (error) {
        res.json(error)
    }
}

const allChannels = async (req, res) => {

    const allChannels = await channelModel.find()

    res.json(allChannels)

}

const oneChannel = async (req, res) => {


    try {
        const id = req.params.id

        const oneChannel = await channelModel.findById(id)

        if(oneChannel === null){
            res.json('id not found')
        }

        res.json(oneChannel)

    } catch (error) {

        res.json("id not found")

        console.log(error);

    }
}



module.exports = { addChannel, allChannels, oneChannel }