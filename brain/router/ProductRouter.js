import { Router } from "express";
import ProductController from "../Controller/ProductController.js";

const ProductRouter = new Router()

ProductRouter.post('/product', ProductController.create)
ProductRouter.get('/product', ProductController.getAll)
ProductRouter.get('/product/:id', ProductController.getOne)
ProductRouter.put('/product', ProductController.update)
ProductRouter.delete('/product/:id', ProductController.delete)

export default ProductRouter;