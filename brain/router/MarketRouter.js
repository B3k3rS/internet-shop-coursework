import { Router } from "express";
import MarketController from '../Controller/MarketController.js'

const MarketRouter = new Router()

MarketRouter.get('/carts', MarketController.getAll)
MarketRouter.post('/carts', MarketController.getMy)
MarketRouter.post('/new', MarketController.create)

export default MarketRouter; 