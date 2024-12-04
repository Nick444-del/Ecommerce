import jwt from 'jsonwebtoken';
import usersModel from "../models/users.model";

export const getAllUsers = async (req, res) => {
    try {
        const users = await usersModel.find().populate("address");
        return res.status(200).json({
            success: true,
            data: users,
            error: false
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error
        })
    }
}

export const register = async (req, res) => {
    try {
        const { fullname, email, mobile, address, state, pincode, password } = req.body;
        const existUser = await usersModel.findOne({
            email: email
        })
        if (existUser) {
            return res.status(400).json({
                message: "User already registered",
                success: false
            })
        }
        const userData = await usersModel.create({
            fullname: fullname,
            email: email,
            mobile: mobile,
            address: address,
            state: state,
            pincode: pincode,
            password: password
        })
        const token = jwt.sign({
            userData
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30m"
        })
        return res.status(201).json({
            data: userData,
            token,
            message: "User created successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            })
        }
        if (!password) {
            return res.status(400).json({
                message: "Password is required",
                success: false
            })
        }
        const userInfo = await usersModel.findOne({
            email: email
        })
        if (!userInfo) {
            return res.status(400).json({
                message: "User does not exist",
                success: false
            })
        }
        if (userInfo.email == email && userInfo.password == password) {
            const user = { user: userInfo };
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "36000m"
            });
            return res.status(200).json({
                error: false,
                message: "Login Successfully",
                email,
                token
            })
        } else {
            return res.status(400).json({
                message: "Invalid username or password",
                success: false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: err.message,
            success: false
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { fullname, email, mobile, address, password } = req.body;

        // Check if user exists
        const existData = await usersModel.findById(userId);
        if (!existData) {
            return res.status(404).json({
                message: "User does not exist",
                success: false
            });
        }

        // Update user data
        const updatedUser = await usersModel.findByIdAndUpdate(
            userId,
            {
                fullname: fullname || existData.fullname,
                email: email || existData.email,
                mobile: mobile || existData.mobile,
                password: password || existData.password,
                addresses: address || existData.address, // Updating addresses array
            }
        );
        return res.status(200).json({
            data: updatedUser,
            message: "User updated successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

export const singleUser = async (req, res) => {
    try {
        console.log(req.user);
        const { user } = req.user;
        console.log("User from token: ", user);

        const isUser = await usersModel.findOne({ email: user.email })
        if(!isUser){
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({
            user: isUser,
            message: "User fetched successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error
        })
    }
}

export const addAddress = async (req, res) => {
    try {
        const userId = req.params.userId;
        const {address} = req.body;
        const user = await usersModel.findById(userId);
        if(!user){
            return res.status(404).json({
                success: false,
                data: null,
                error: "User not found"
            })
        }
        user.address.push(address);
        await user.save();
        return res.status(200).json({
            success: true,
            data: user,
            error: false
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error
        })
    }
}