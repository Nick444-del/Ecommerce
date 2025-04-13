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
        const { fullname, email, mobile, password } = req.body;
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
        if (!isUser) {
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
        const { address } = req.body;
        const user = await usersModel.findById(userId);
        if (!user) {
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

export const addAddressByReq = async (req, res) => {
    const { addressId } = req.body;

    // Validate the addressId is provided and valid
    if (!addressId) {
        return res.status(400).json({
            success: false,
            message: "Address ID is required"
        });
    }

    console.log("Address ID:", addressId);
    console.log("User infromation ==> " + req.user.user._id)
    try {
        const userId = req.user.user._id;

        // Find the user by ID
        const user = await usersModel.findById(userId);
        console.log("User:", user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Initialize the address array if it doesn't exist
        if (!user.address) {
            user.address = [];
        }

        // Check if the address already exists in the user's address list
        if (user.address.includes(addressId)) {
            return res.status(400).json({
                success: false,
                message: "Address already exists"
            });
        }

        // Add the addressId to the user's address array
        user.address.push(addressId);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Address added successfully",
            data: user
        });
    } catch (err) {
        // Log the error for debugging
        console.error("Error adding address:", err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
};


export const deleteAddress = async (req, res) => {
    try {
        const addressId = req.params.addressId;  // The address ID to delete
        // Find the user who has this address ID in their address array
        const user = await usersModel.findOne({ 'address': addressId });

        if (!user) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "User not found with the provided address ID."
            });
        }

        // Remove the address ID from the user's address array
        user.address = user.address.filter(addressIdInUser => addressIdInUser.toString() !== addressId);

        // Save the updated user document
        const updatedUser = await usersModel.updateMany(
            { 'address': addressId },
            { $pull: { address: addressId } }
        );

        return res.status(200).json({
            success: true,
            data: updatedUser,
            error: false
        });
    } catch (error) {
        console.error("Error deleting address:", error);
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        });
    }
}

export const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Admin login", email, password);
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }
        const user = await usersModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }
        if (user.isAdmin) {
            const token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });
            return res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data: user.email,
                token
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "You are not an admin"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await usersModel.deleteOne({ _id: userId })
        return res.status(200).json({
            success: true,
            data: response,
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

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.user._id;

        // Find the user by ID
        const user = await usersModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "User not found"
            })
        }

        // Check if the old password is correct
        if (user.password !== oldPassword) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Old password is incorrect"
            })
        }

        user.password = newPassword
        await user.save();

        return res.status(200).json({
            success: true,
            data: user,
            error: false,
            message: "Password changed successfully"
        })
    } catch (error) {
        console.error('Error changing password:', error.message);  // Log the error
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        });
    }
}