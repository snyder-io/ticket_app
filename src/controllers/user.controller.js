import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Register User",
        status: "OK"
    });
})
export const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "Login User",
        status: "OK"
    });
})