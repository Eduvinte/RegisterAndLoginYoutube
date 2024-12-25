import { loginUserService } from "../services/Login-user-service.js";

export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await loginUserService(email, password)
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}