import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    globalID: {
        type: String,
        unique: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    userName:{
        type: String,
        unique: true
    },
    firstPassword: {
        type: String,
    },
    password: {
        type: String,
    },
    email:{
        type: String,
        unique: true
    },
    phone:{
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    age: {
        type: Number,
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    photo: {
        type: String,
    },
    },
    {
        timestamps: true,
        versionKey:false
    }
);

export default mongoose.model('User', UserSchema);