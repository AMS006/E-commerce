import express from 'express';
import {createUser,loginUser,loginAdmin,logoutUser,forgotPassword,resetPassword,changePassword,updateProfile,getAllUser,getSingleUser,deleteUser,updateRole,getUserDetails} from '../../controllers/UserController'
import {requireSignIn,isAdmin} from '../../middleware/authentication'
import {check} from 'express-validator'
import { signInValidation, signUpValidation } from '../../validator/authValidator';
import checkErrors from '../../middleware/ErrorDetector';
const router = express.Router();


router.post("/signup",signUpValidation,checkErrors,createUser)

router.post("/login",signInValidation,checkErrors, loginUser);

router.get("/logout",logoutUser)

router.post('/adminLogin',loginAdmin);

router.get("/me",requireSignIn,getUserDetails);

router.put("/password/forgot",forgotPassword);

router.put("/password/reset/:token",resetPassword);

router.put("/password/update",requireSignIn,changePassword)

router.put("/update/profile", requireSignIn, updateProfile);

router.get("/admin/getAllUser",requireSignIn,isAdmin,getAllUser);

router.get("/admin/single/:_id", requireSignIn,isAdmin, getSingleUser);

router.put("/admin/update/role/:_id", requireSignIn,isAdmin, updateRole)

router.delete("/admin/:_id", requireSignIn,isAdmin, deleteUser);
module.exports = router;