import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[1-9]\d{9}$/;
  return phoneRegex.test(phone) && phone !== "1234567890";
};

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // Validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone number is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    if (!isValidPhoneNumber(phone)) {
      return res.send({ message: "Invalid phone number" });
    }
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
      answer,
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
    // Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Check user
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
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
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    // Check
    const user = await userModel.findOne({ email, answer });
    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
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
