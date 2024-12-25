import prisma from "../database/database.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/Generate-token.js";

export const loginUserService = async (email, password) => {
    try {
        
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {
            throw new Error("User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        
        if(!isPasswordCorrect) {
            throw new Error("User not found");
        }


        // generate token
        const token = generateToken(user);

        return { message: "User logged in successfully", token };

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}