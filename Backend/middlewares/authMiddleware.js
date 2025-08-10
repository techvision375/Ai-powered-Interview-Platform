import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        // console.log(req.headers);

        let token = req.headers.authorization;
         console.log("Authorization header:", token);
        if (token && token.startsWith("Bearer ")) {
            //extract the token from the Authorization header
            token = token.split(" ")[1];
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log( "decoded message" ,decoded);
            req.user = await User.findById(decoded.id).select("-password");
            console.log(req.user);
            next();
        } else {
            return res.status(401).json({ message: "Not authorized, no token" });
        }



    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });

    }

};


