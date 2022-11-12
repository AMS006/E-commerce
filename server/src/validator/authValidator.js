import {check} from 'express-validator'
exports.signUpValidation  = [check('name')
.notEmpty()
.withMessage("Name Field Cannot be Empty")
.isLength({min:3})
.withMessage("Name field must have atleast 3 character"),
check('email')
.isEmail()
.withMessage("Invalid Email"),
check("password")
.isLength({min:8})
.withMessage("Password Must be of atleast 8 character")
]
exports.signInValidation  = [
check('email')
.isEmail()
.withMessage("Invalid Email")
]