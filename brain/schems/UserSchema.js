import mongoose from 'mongoose';
import RoleSchema from './RoleSchema.js';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        ref: 'RoleSchema'
    }],
    balance: {
        type: Number,
        required: true,
        default: 100
    },
    photo: {
        type: String,
        required: true,
        default: 'https://i.imgur.com/3lE1JBy.png'
    }
})

export default mongoose.model('UserSchema', UserSchema)