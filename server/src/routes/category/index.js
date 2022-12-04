import express from 'express'
import {addCategory,getCategory,deleteCategory,updateCategory} from '../../controllers/categoryController'
import {requireSignIn,isAdmin} from '../../middleware/authentication'
import multer from 'multer';
const router = express.Router();
const storage = multer.diskStorage({
    destination: "./src/uploads",
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
const upload = multer({storage});

router.post('/',requireSignIn,isAdmin,upload.single("categoryImage"),addCategory)

router.get('/',getCategory)

router.delete('/',deleteCategory)

router.put('/',updateCategory)

module.exports = router