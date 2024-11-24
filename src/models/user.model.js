import mongoose, { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        index: true,  // Index for fast lookup
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'], // Email validation
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password should be at least 6 characters long'], // Password validation
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'support'],  // User roles (e.g., user, admin, or support staff)
        default: 'user',
    },
    avatar: {
        type: String,
        required: false,  // Optional avatar URL (can be used to store the user's profile picture)
    },
    refreshToken: {
        type: String,
        required: false,  // Used to store refresh tokens for session management
    },
    isActive: {
        type: Boolean,
        default: true,  // To indicate if the user is active
    },
    lastLogin: {
        type: Date,
        required: false,  // Tracks the last login timestamp
    },
}, {
    timestamps: true,  // Automatically adds `createdAt` and `updatedAt`
});

// Middleware to update the `updatedAt` field whenever the document is modified
userSchema.pre("save", async function (next) {
    if (!this.isModified('password'))
        return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            userName: this.userName,
            email: this.email,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = model('User', userSchema);
