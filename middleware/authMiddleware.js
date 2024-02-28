import Jwt  from "jsonwebtoken";
import User from "../model/userModel.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async(req,res,next)=>{
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]

            // decodes token id
            const decoded = Jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password")

            next()
        } catch (error) {
            res.status(401)
            throw new Error("No authorized, token failed")
        }
    }
})