import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import PostRouter from './router/PostRouter.js';
import ProductRouter from './router/ProductRouter.js';
import authRouter from './router/authRouter.js';
import MarketRouter from './router/MarketRouter.js';

const PORT = 9999;
const DB_URL = `mongodb+srv://user:user@ordenbd.runjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', PostRouter)
app.use('/api', ProductRouter)
app.use('/auth', authRouter)
app.use('/cart', MarketRouter)

app.post('/', )

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('SERVER START ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}
 
startApp(); 
 