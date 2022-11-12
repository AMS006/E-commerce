import express from 'express';
import {getAllProducts,createProduct,deleteProduct,updateProduct, getProduct} from '../../controllers/productController'
import {requireSignIn,isAdmin} from '../../middleware/authentication'
const router = express.Router();
import multer from 'multer'

const storage = multer.diskStorage({
    destination: "./src/uploads",
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
const upload = multer({storage});

//For adding the Product by admin
router.post('/',requireSignIn,isAdmin,upload.array('files',10),createProduct);
// router.post('/',upload.array('files',10),createProduct);


//For getting all the list of products
router.get('/', getAllProducts);

//for deleting the specific product by admin
router.delete('/:_id',requireSignIn,isAdmin,deleteProduct);


//for getting the detials of specific product 
router.get("/:_id", getProduct);

//Update the Product only by admin
router.put("/:_id",requireSignIn,isAdmin, updateProduct);
module.exports = router