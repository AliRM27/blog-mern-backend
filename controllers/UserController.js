import jwt from "jsonwebtoken"; //Required for authentication
import bcrypt from "bcrypt";
import UserModel from "../models/User.js"

export const register = async (req, res) => {
    try{
        // Hashing password
        const password = req.body.password
        const salt = await bcrypt.genSalt(10) //algorithm for hashing
        const hash = await bcrypt.hash(password, salt)

        //prepare the doc about User
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        })

        //save the user in db
        const user = await doc.save()

        //create token
        const token = jwt.sign(
            {
                _id: user._id,
            }, 
            "secret123", 
            {
                expiresIn: "30d"
            }
        )

        //remove passwordHash from Userdata
        const {passwordHash, ...UserData} = user._doc

        res.json({
            ...UserData, 
            token
        })
    } catch (err){
        console.log(err)
        res.status(500).json({
            message: "Could not register",
        })
    }
}

export const login = async (req, res) => {
    try{
        const user = await UserModel.findOne({email: req.body.email})

        if(!user){
            return res.status(400).json({
                message: "User not found" //try to decribe the problem not presise
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if(!isValidPass){
            return res.status(400).json({
                message: "Login or password are incorrect" //try to decribe the problem not presise
            })
        }

        const token = jwt.sign(
            {
                _id: user._id,
            }, 
            "secret123", 
            {
                expiresIn: "30d"
            }
        )

        //remove passwordHash from Userdata
        const {passwordHash, ...UserData} = user._doc

        res.json({
            ...UserData, 
            token
        })
    }catch (err){
        console.log(err)
        res.status(500).json({
            message: "Could not login",
        })
    }
}

export const getMe = async (req, res) => {
    try{
        const user = await UserModel.findById(req.userId)

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        const {passwordHash, ...UserData} = user._doc

        res.json(UserData)
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: "No access",
        })
    }
}