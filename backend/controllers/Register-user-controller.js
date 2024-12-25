import { registerUserService } from "../services/Register-user-service.js";

export const registerUserController = async (req, res) => {
    try {
        const { name, email, password, height, weight, age, gender } = req.body;
        const response = await registerUserService(name, email, password, height, weight, age, gender);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}