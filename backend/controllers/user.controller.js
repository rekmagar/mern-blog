import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        });

        return res.status(201).json({ 
            success: true,
            message: "User registered successfully"
        });
    } catch (error) {        
        console.log(error);
        return res.status(500).json({ 
            success: false,
            message: "Failed to register user"
        });
    }
}

export const login = async (req, res) => {
    // Login logic to be implemented
    try
    {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Login successful, generate JWT token
        const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn:'1d'});
        return res.status(200).cookie('token', token, {maxAge: 1*24*60*60*1000, httpsOnly:true, sameSite:"strict"}).json({
            success: true,
            message: `Welcome back, ${user.firstName}!`,
            user
        });

    } catch (error) {   
        console.log(error);
        return res.status(500).json({ 
            success: false,
            message: "Failed to login user"
        });
    }
}

export const logout = async (_, res) => {
    try {
        res.clearCookie('token').status(200).json({ 
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to logout user"
        });
    }
}