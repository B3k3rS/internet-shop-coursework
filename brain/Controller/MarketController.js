import MarketSchema from "../schems/MarketSchema.js";

class MarketController {
    async getAll (req, res) {
        try {
            const carts = await MarketSchema.find()
            return res.json(carts)
        } catch (e) {
            res.json(e)
        }
    }

    async create (req,res) {
        try {
            const {product, productType, cost, server, buyerID } = req.body;
            const sell = await MarketSchema.create({product, productType, cost, server, buyerID })
            return res.json(sell)
        } catch (e) {
            res.json(e)
        }
    }

    async getMy (req, res) {
        try {
            const {buyerID} = req.body
            if (!buyerID || buyerID == '') {
                return res.status(400).json({error: "Не указан ID покупателя"})
            }
            const mycart = await MarketSchema.find({buyerID: buyerID})
            return res.json(mycart)
        } catch (e) {
            res.json(e)  
        }
    }
} 

export default new MarketController(); 