import express from 'express'
import {addToCart} from '../../controllers/cartController'
import {requireSignIn,isUser} from '../../middleware/authentication'
const Router = express.Router();

Router.post('/',requireSignIn,isUser,addToCart)

module.exports = Router;