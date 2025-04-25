const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(400);
      throw new Error("users not found");
    }

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide name, email, and password");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User with this email already exists");
    }

    // Set default role to 'client' if not provided
    const userRole = role && role.toLowerCase() === "admin" ? "admin" : "client";

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    if (!user) {
      res.status(500);
      throw new Error("Failed to create user");
    }

    // Exclude password from response for security reasons
    const { password: userPassword, ...otherDetails } = user._doc;

    return res.status(201).json({
      message: "User created successfully",
      user: otherDetails,
    });
  } catch (error) {
    next(error);
  }
};


// const loginUser = async (req, res, next) => {
//   try {
//     // todo use joi to validate data;

//     const { email, password } = req.body;

//     // get user from database
//     const user = await User.findOne({ email });

//     if (!user) {
//       res.status(400);
//       throw new Error("user not found");
//     }

//     // compare the password

//     const isCoreect = await bcrypt.compare(password, user.password);

//     if (!isCoreect) {
//       res.status(400);
//       throw new Error("incorrect password");
//     }

//     // generate token set
//     // set cookie
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     res.cookie("jwt", token);

//     const { password: userPassword, ...rest } = user._doc;
//     return res.status(200).json({
//       ...rest,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const loginUser = async (req, res, next) =>{

  try {
    const {email, password} = req.body;
    // get user from database
    const user = await User.findOne({email});

    if(!user){
      res.status(400);
      throw new Error("user not found")
    }

    // compare the password
    // the password is given from the front end and compared with de DB
    const isCoreect = await bcrypt.compare(password, user.password);

    if(!isCoreect){
      res.status(400);
      throw new Error("incorrect password")
    }

    // generate token set
    //set cookie
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("jwt", token);
    
    //For security reasons, we don't send back the user password 
    const { password: userPassword, ...rest } = user._doc;
    return res.status(200).json({
      ...rest,
    })
  } catch (error) {
    next(error)
  }
}

const logoutUser = async (req, res, next) => {
  res.cookie("jwt", " ", { expiresIn: "-1" });
  return res.json({ message: "you have been logged out" });
};

module.exports = {
  getUsers,
  createUser,
  loginUser,
  logoutUser,
};
