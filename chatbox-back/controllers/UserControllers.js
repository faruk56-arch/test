const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userModel = require('../models/userModel')

const addUser = async (req, res) => {

    try {

        const userInfo = req.body

        const pswcrypt = bcrypt.hashSync(req.body.password)

        const infoToSave = {

            firstName: userInfo.firstName.toLowerCase(),
            lastName: userInfo.lastName.toLowerCase(),
            birthday: userInfo.birthday.toLowerCase(),
            state: userInfo.state.toLowerCase(),
            telNumber: userInfo.telNumber.toLowerCase(),
            email: userInfo.email.toLowerCase(),
            password: pswcrypt

        }

        const findUser = await userModel.find({ email: infoToSave.email })

        console.log("finduser: ", findUser[0]);

        if (findUser[0] === undefined) {

            await userModel.create(infoToSave)

            res.status(200).json("user added")
        }

        res.json("user already exist")

    } catch (error) {

        res.status(400).json(error)


    }

}

const login = async (req, res) => {

    try {

        const email = req.body.email.toLowerCase()

        const password = req.body.password


        const findUser = await userModel.findOne({ email })

        console.log(findUser);

        if (findUser === null) {
            res.json('user not found')
        }

        const checkPassowrd = bcrypt.compareSync(password, findUser.password)

        if (checkPassowrd) {

            const assignToken = await jwt.sign({ _id: findUser._id }, config.key, { expiresIn: 3600000 })

            res.status(200).json(`user : ${findUser.firstName} ${findUser.lastName}, token: ${assignToken}`)

        }

        res.json("passord incorrect")

    } catch (error) {

        res.status(400).json(error)


    }
}

module.exports = { addUser, login }