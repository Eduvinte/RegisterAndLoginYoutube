import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3008, () => {
    console.log("Server is running on port 3008");
})

app.get("/", (req, res) => {
    res.send("Hello world");
})

import { registerUserController } from "../controllers/Register-user-controller.js";
import { loginUserController } from "../controllers/Login-user-controller.js";

app.post("/api/v1/register-user", registerUserController);
app.post("/api/v1/login-user", loginUserController);