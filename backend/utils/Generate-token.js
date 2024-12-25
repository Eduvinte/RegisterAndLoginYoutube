import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    try {
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name, height: user.height, weight: user.weight, age: user.age, gender: user.gender }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return token
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}