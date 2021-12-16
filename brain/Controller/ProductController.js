import ProductSchema from "../schems/ProductSchema.js"

class PostController {
    async create(req,res) {
        try {
            const {category, name, link, info, cost, quantity} = req.body
            const Product = await ProductSchema.create({category, name, link, info, cost, quantity})
            res.json(Product)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll (req, res) {
        try {
            const products = await ProductSchema.find();
            return res.json(products)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne (req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json('Не указан ID')
            }
            const product = await ProductSchema.findOne({_id: id});
            return res.json(product)

        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update (req, res) {
        try {
            const product = req.body
            if(!product._id) {
                res.status(400).json('Не указан ID')
            }
            const updatedProducts = await ProductSchema.findByIdAndUpdate(product._id, product, {new: true})
            return res.json(updatedProducts)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete (req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json('Не указан ID')
            }
            const product = await ProductSchema.findByIdAndDelete(id);
            return res.json(product) 
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new PostController();