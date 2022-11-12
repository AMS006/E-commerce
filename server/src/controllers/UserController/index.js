import { UserModel } from "../../models/User";
import generateToken from "../../utils/genereteToken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../../utils/sendEmail";
import {validationResult} from 'express-validator'
exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty())
      return res.status(400).json({message:errors.array()[0].msg})
    const { name, email, password, phone,avatar } = req.body;
    if (!email || !password) return res.status(400).json("Invalid request");
    const EmailExists = await UserModel.findOne({ email });
    if (EmailExists)
      return res.status(400).json({ message: "User already exists" });
    const user = await UserModel.create({
      name,
      email,
      password,
      phone,
      avatar
    });
    generateToken(res, 201, user);
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ message: error.message });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Invalid input" });
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Invalid Email or password" });
    const ispasswordMatched = await bcrypt.compare(password, user.password);
    if (!ispasswordMatched)
      return res
        .status(404)
        .json({ success: false, message: "Invalid Email or password" });
    generateToken(res, 200, user);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    return res
      .status(200)
      .json({ success: true, message: "Lougged Out Succefully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
exports.forgotPassword = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).json({ messaage: "User does not exists" });
    const token = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: true });
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/user/password/reset/${token}`;
    const message = `Your Password Reset Link :- \n\n ${resetUrl} \n\n If this was not send by you plzz don't click on the link `;
    const subject = "E-commerce password Recovery";
    try {
      await sendEmail({ email: user.email, subject, message });
      return res.status(200).json({ message: "Email send to user" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });
      console.log(error);
      return res.status(400).json({ success: false, message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const token = req.params.token;

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(400)
        .status({ message: "Unable to Change the password" });

    if (req.body.password !== req.body.confirmPassword)
      return res.status(403).json({ message: "Password does not match" });

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    generateToken(res, 200, user);
  } catch (error) {
    return res.status(500).json({ messaage: error.message });
  }
};
exports.changePassword = async (req, res) => {
  try {
    // console.log(req.user);
    const user = await UserModel.findOne({ email: req.user.email }).select(
      "+password"
    );
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (oldPassword === newPassword)
      return res
        .status(400)
        .json({ message: "Your old Password and new Password cannot be same" });
    const ispasswordMatched = await bcrypt.compare(oldPassword, user.password);
    if (!ispasswordMatched)
      return res
        .status(404)
        .json({ success: false, message: "Invalid password" });
    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "Password does not matches" });
    user.password = newPassword;
    await user.save();
    generateToken(res, 200, user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    data.role = "user";
    if (data.password)
      return res.status(400).json({ message: "Cannot update Password" });
    const updateUser = await UserModel.findByIdAndUpdate(req.user.id, data, {
      new: true,
    });
    return res.status(201).json({ updateUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getSingleUser = async (req, res) => {
  try {
    const _id = req.params._id;
    console.log(_id);
    const user = await UserModel.findById(_id);

    if (!user) return res.status(403).json({ message: "User does not exists" });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const _id = req.params._id;

    const user = await UserModel.findByIdAndDelete(_id);
    // console.log(user);
    if (!user) return res.status(404).json({ message: "User can't deleted" });

    return res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.updateRole = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    const user = await UserModel.findByIdAndUpdate(req.params._id, data, {
      new: true,
    });

    return res.status(201).json({ message: "User Role Updated", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
