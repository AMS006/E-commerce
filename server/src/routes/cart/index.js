import express from 'express'
import {addToCart,getCart} from '../../controllers/cartController'
import {requireSignIn,isUser} from '../../middleware/authentication'
const Router = express.Router();

Router.post('/',requireSignIn,isUser,addToCart)

Router.get('/',requireSignIn,isUser,getCart)
module.exports = Router;