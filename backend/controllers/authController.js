import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import crypto from 'crypto';
import { sendResetPasswordEmail } from '../mailer.js';
import validator from 'validator';

const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[1-9]\d{9}$/;
  return phoneRegex.test(phone) && phone !== "1234567890";
};

const isStrongPassword = (password) => {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
};

export const registerController = async (req, res) => {
  try {
    let { name, email, password, phone, address} = req.body;
    // Validations
    if (!name) {
      return res.status(400).send({ message: "Name is Required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is Required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone number is Required" });
    }
    if (!address) {
      return res.status(400).send({ message: "Address is Required" });
    }
    if (!isValidPhoneNumber(phone)) {
      return res.status(400).send({ message: "Invalid phone number" });
    }
    if (!isStrongPassword(password)) {
      return res.status(400).send({ message: "Password must be strong (min 8 characters, include uppercase, lowercase, number, and symbol)" });
    }

    // Convert email to lowercase
    email = email.toLowerCase();

    // Check user
    const existingUser = await userModel.findOne({ email });
    // Existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login",
      });
    }
    // Register user
    const hashedPassword = await hashPassword(password);
    // Save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    // Convert email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Check user
    const user = await userModel.findOne({ email: normalizedEmail });
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};


// Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    await sendResetPasswordEmail(email, resetToken);

    res.status(200).send({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).send({ message: "New Password is required" });
    }
    if (!isStrongPassword(newPassword)) {
      return res.status(400).send({
        success: false,
        message: "New password does not meet the strength requirements (min 8 characters, include uppercase, lowercase, number, and symbol)",
      });
    }

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Password reset token is invalid or has expired",
      });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// Update Profile
export const updateProfileController= async (req, res) => {
  const userId = req.user._id; // Assuming you have a middleware that sets req.user
  const {
    name,
    email,
    password,
    address,
    phone,
    dob,
    socialCategory,
    gender,
    maritalStatus,
    physicallyChallenged,
    city,
    state,
    class10,
    class12,
    graduation
  } = req.body;

  try {
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }
    if (address) updateData.address = address;
    if (phone) updateData.phone = phone;
    if (dob) updateData.dob = dob;
    if (socialCategory) updateData.socialCategory = socialCategory;
    if (gender) updateData.gender = gender;
    if (maritalStatus) updateData.maritalStatus = maritalStatus;
    if (physicallyChallenged !== undefined) updateData.physicallyChallenged = physicallyChallenged;
    if (city) updateData.city = city;
    if (state) updateData.state = state;
    if (class10) updateData.class10 = class10;
    if (class12) updateData.class12 = class12;
    if (graduation) updateData.graduation = graduation;

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: "Profile updated successfully", data: updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, message: `Error updating profile: ${error.message}` });
  }
};


// Get Updated Profile

export const getProfileController = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId).select('-password -resetPasswordToken -resetPasswordExpires');
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching user profile",
      error,
    });
  }
};


// Get All Users Controller
export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}, '-password -answer'); // Exclude password and answer fields
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error,
    });
  }
};

// Update User Role Controller
export const updateUserRoleController = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    if (!userId || newRole === undefined) {
      return res.status(400).send({ success: false, message: "User ID and new role are required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    user.role = newRole;
    await user.save();

    res.status(200).send({
      success: true,
      message: "User role updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).send({
      success: false,
      message: "Error updating user role",
      error,
    });
  }
};

// Delete user controller
export const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Delete all users controller
export const deleteAllUsersController = async (req, res) => {
  try {
    const result = await userModel.deleteMany({});

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No users found to delete' });
    }

    res.status(200).json({ message: `${result.deletedCount} user(s) deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting users', error: error.message });
  }
};


export const getUserDetailsController = async (req, res) => {
  try {
    const { id } = req.params; // Get the user ID from the route parameters
    const user = await userModel.findById(id).select('-password -resetPasswordToken -resetPasswordExpires');

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching user details",
      error,
    });
  }
};