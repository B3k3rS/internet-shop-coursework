import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    }
      
})

export default mongoose.model('PostSchema', PostSchema)