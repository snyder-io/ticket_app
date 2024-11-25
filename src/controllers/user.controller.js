import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import apiResponse from "../utils/apiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, firstName, middleName, lastName, password, } = req.body;

    if (!userName) {
        throw new apiError(400, "Username is required")
    }
    if (!email) {
        throw new apiError(400, "Email is required")
    }
    if (!firstName) {
        throw new apiError(400, "First name is required")
    }
    if (!lastName) {
        throw new apiError(400, "Last name is required")
    }
    if (!password) {
        throw new apiError(400, "Password is required")
    }
    const existedUser = await User.findOne({
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
        middleName,
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
