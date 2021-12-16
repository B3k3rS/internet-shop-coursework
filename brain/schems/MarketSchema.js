import mongoose from 'mongoose';
var date = new Date();

const MarketSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    server: {
        type: String,
        required: true
    },
    buyerID: {
        type: String,
        required: true,
    },
    dateAndTime: {
        type: String,
        required: true,
        default: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    },
    
})

export default mongoose.model('MarketSchema', MarketSchema)