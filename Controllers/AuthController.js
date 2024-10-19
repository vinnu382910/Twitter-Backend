const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const UserModel = require('../Models/User');

const signup = async (req, res) => {
    try{
        const { username, email, gender, password} = req.body;
        const user = await UserModel.findOne({ username });
        if(user) {
            return res.status(409)
                .json({message:'Username already exists, you can login', success:false});
        }
        const userModel = new UserModel({user_id: uuidv4(), username, email,gender, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({message: 'Signup successfully', success:true})
    }catch(err) {
        res.status(500)
        .json({
            message: 'Internal server error',
            success:false
        })
    }
}

const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await UserModel.findOne({ username });
        const errMsg = 'Authentication failed username or password is wrong'
        if(!user) {
            return res.status(403)
                .json({message: 'No user found, please provide valid details', success:false});
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual) {
            return res.status(403)
                .json({message: errMsg, success:false});
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                message: 'JWT secret is not set',
                success: false
            });
        }

        const jwtToken = jwt.sign(
            { username: user.username, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email: user.email,
                username,
            })
    }catch(err) {
        res.status(500)
        .json({
            message: 'Internal server error',
            success:false
        })
    }
}


module.exports = {
    signup,
    login
}