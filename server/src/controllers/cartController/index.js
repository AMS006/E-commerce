import { CartModel } from "../../models/Cart";

exports.addToCart = async (req, res) => {
  try {
    const cartData = req.body.cartItems;
    const Cart = await CartModel.findOne({ user: req.user._id });
    let condition, action;
    if (Cart) {
      const isItemAdded = Cart.cartItems.find(
        (item) => req.body.cartItems.product == item.product
      );
      if (isItemAdded) {
        condition = {
          user: req.user._id,
          "cartItems.product": req.body.cartItems.product,
        };
        action = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: isItemAdded.quantity + 1,
            },
          },
        };
      } else {
        condition = {
          user: req.user._id,
        };
        action = {
          $push: {
            cartItems: cartData,
          },
        };
      }
      const cart = await CartModel.findOneAndUpdate(condition,action);
      return res.status(200).json({message:"Cart Updated", cart});
    } else {
      const cart = await CartModel.create({
        user: req.user._id,
        cartItems: [cartData],
      });
      return res.status(201).json({ message: "Item Added to cart", cart });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getCart = async(req,res) =>{
    try {
        const user = req.user._id;
        const cart = await CartModel.find({user});

        if(!cart){
            return  res.status(404).json({message:"No item added to cart"})
        }
        return res.status(200).json({cart});
    }catch (error) {
        return res.status(500).json({message:error.message});
    }
}
