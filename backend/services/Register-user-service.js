import prisma from "../database/database.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/Send-email.js";
export const registerUserService = async (name, email, password, height, weight, age, gender) => {
    try {
        
        // check if user already exists
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(user) {
            throw new Error("User already exists teste");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                height: parseInt(height),
                weight: parseInt(weight),
                age: parseInt(age),
                gender
            }
        })
        await sendEmail(email, "Welcome to our app" + name, "Thank you for registering");
        return { message: "User registered successfully" };
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}