import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';
import usersModel from "../models/users.model.js";
import orderModel from "../models/order.model.js";
import addressModel from "../models/address.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const adminId = req.user._id; // Extracting admin ID from authenticated user

        if (adminId) {
            const users = await usersModel.find().select('-password'); // Exclude sensitive data like password
            return res.status(200).json({
                success: true,
                message: "Users fetched successfully",
                data: users
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access",
                data: null
            });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
};

export const register = async (req, res) => {
    try {
        const { fullname, email, mobile, address, password } = req.body;
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
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })
        const emailTemplate = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4CAF50;">Welcome to Our Platform, ${fullname}!</h2>
            <p>Thank you for registering with us. We're excited to have you on board.</p>
            <p><strong>Email:</strong> ${email}</p>
            <p>If you didn't register on our platform, please ignore this email.</p>
            <hr>
            <p style="font-size: 0.9em;">Best Regards,<br>Your Company Team</p>
        </div>
    `;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Registration Successful - Verify Your Email",
            html: emailTemplate
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

        // Delete the user
        const response = await usersModel.deleteOne({ _id: userId });
        if (response.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete all orders associated with the user
        await orderModel.deleteMany({ userId: userId });
        console.log("All orders associated with the user deleted successfully");

        // Delete all addresses associated with the user
        await addressModel.deleteMany({ _id: address });
        console.log("All addresses associated with the user deleted successfully");

        return res.status(200).json({
            success: true,
            message: "User, Orders, and Addresses deleted successfully",
            data: response
        });
    } catch (error) {
        console.error("Error deleting user, orders, or addresses:", error);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};


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

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body; // Destructure email from request body
        // Validate email presence
        if (!email) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Email is required"
            });
        }
        // Find the user by email
        const user = await usersModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "User not found"
            });
        }
        // Check if OTP is already sent and not expired
        if (user.otp?.otp && user.otp.sendTime > Date.now()) {
            const waitTime = new Date(user.otp.sendTime).toLocaleString();
            return res.status(429).json({
                success: false,
                data: null,
                error: `Please wait until ${waitTime} before requesting a new OTP.`
            });
        }

        // Generate a new OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

        // Update OTP in the database
        user.otp = {
            otp: otp.toString(),
            sendTime: otpExpiry,
            token: "" // You can add a token here if required
        };

        // Save the updated user object to the database
        const updatedUser = await user.save();

        if (!updatedUser) {
            throw new Error("Failed to update OTP in the database.");
        }

        console.log(`Generated OTP: ${otp}`); // For testing purposes

        // Send OTP via email using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or your email service provider
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background-color: #f9fafc;">
            <h2 style="text-align: center; color: #4a90e2;">Password Reset Request</h2>
            <p>Hello <strong>${user.fullname || 'User'}</strong>,</p>
            <p>We received a request to reset your password. Use the OTP below to reset it. This OTP is valid for <strong>5 minutes</strong>.</p>
            <div style="text-align: center; margin: 20px 0;">
                <span style="
                    display: inline-block; 
                    font-size: 24px; 
                    font-weight: bold; 
                    color: #ffffff; 
                    background-color: #4a90e2; 
                    padding: 10px 20px; 
                    border-radius: 4px;">
                    ${otp}
                </span>
            </div>
            <p>If you did not request this, please ignore this email or contact our support if you have concerns.</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
            <p style="font-size: 12px; text-align: center; color: #888;">This is an automated email. Please do not reply to this message.</p>
            <p style="font-size: 12px; text-align: center; color: #888;">&copy; ${new Date().getFullYear()} YourCompanyName. All Rights Reserved.</p>
        </div>`
        });

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to your email."
        });

    } catch (error) {
        console.error("Error in forgetPassword:", error);
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { otp } = req.body;

        console.log("Received OTP:", otp);
        if (!otp) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "OTP is required"
            });
        }
        const response = await usersModel.findOne({ "otp.otp": otp });
        if (!response || !response?.otp?.otp || response.otp.otp !== otp) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Invalid OTP"
            });
        }
        const currentTime = Date.now();
        if (currentTime > response.otp.sendTime + 5 * 60 * 1000) { // 5-minute expiration window
            return res.status(400).json({
                success: false,
                data: null,
                error: "OTP expired"
            });
        }
        response.otp = { otp: "", sendTime: 0, token: "" };
        await response.save();
        const token = jwt.sign(
            { user: response._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        });
        console.log(token);
        return res.status(200).json({
            success: true,
            token,
            message: 'OTP verified successfully'
        });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({
            success: false,
            data: null,
            error: 'Internal server error'
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;

        console.log(password, " ", confirmPassword);

        // Validate inputs
        if (!password || !confirmPassword) {
            return res.status(400).json({
                message: "Both password fields are required.",
                success: false
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match.",
                success: false
            });
        }

        // Ensure user information exists in the request
        const user = req.user;
        console.log(req.user)
        console.log("User from token:", user);

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized or invalid user.",
                success: false
            });
        }

        // Update the password
        const updatedUser = await usersModel.findByIdAndUpdate(
            user, // Directly use user._id
            { password }, // Directly saving plaintext password (Not recommended in production)
            { new: true } // Ensure updated document is returned
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Password reset successfully.",
            success: true
        });

    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};


export const getUserByToken = async (req, res) => {
    try {
        const userId = req.user.user._id;
        const user = await usersModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: user,
            error: null,
            message: "User fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        })
    }
}