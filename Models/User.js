const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true 
    },
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    gender: { 
        type: String, 
        required: true
    },
    password: {
        type: String,
        require: true,
    }
})

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;