import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import User from "../models/user.model.js";
import apiResponse from "../utils/apiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
    // Get user data from request body
    // Validation - not empty
    // Check if user already exists: username, email
    //Create user object - create entry in database
    // Remove password and refresh token from response
    // Check for user creation
    //return response
    const { userName, email, firstName, lastName, password, } = req.body;

    if (!userName || !email || !firstName || !lastName || !password) {
        throw new apiError(400, "All fields are required");
    }
    const existedUser = User.findOne({
        $or: [
            { userName },
            { email }
        ]
    })
    if (existedUser) {
        throw new apiError(409, "User already exists");
    }
    const user = await User.create({
        userName: userName.toLowerCase(),
        email,
        firstName,
        lastName,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken "
    )
    if (!createdUser) {
        throw new apiError(500, "User not created")
    }
    return res.status(201).json(
        new apiResponse(200, createdUser, "User created successfully")
    )




})
