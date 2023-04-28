import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nameTest: {
        type: String,
    },
    answers: {
        type: [String],
    },
    score:{
        type: String,
    },
    },
    {
        timestamps: true,
        versionKey:false
    }
);

export default mongoose.model('Note', UserSchema);