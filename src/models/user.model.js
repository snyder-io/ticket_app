const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address']
        },
        password: {
            type: String,
            minlength: 8,  // Enforce minimum password length
            required: true,
            trim: true,
        },
        profilePic: {
            type: String,
            default: 'https://example.com/default-profile-pic.jpg',  // Default profile picture URL
        },
        bio: {
            type: String,
            maxlength: 500,  // Max length for bio
        },
        role: {
            type: String,
            enum: ['user', 'admin'],  // Define user roles
            default: 'user',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            default: null,
        }
    }
);

// Middleware to hash password before saving to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();

    try {
        //Salt and hash the password
        const salt = await bcrypt.genSalt(10); // Generate a salt with a strength of 10
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (error) {
        next(error);
    }
});

// Instance method to compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Compare the entered password with the hashed password
};

// Static method to generate JWT token
userSchema.statics.generateJWT = function (userId) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1h',    // Token expiration time
    });
    return token;
};

module.exports = model("User", userSchema);