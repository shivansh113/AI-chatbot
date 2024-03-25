import user from "../models/user.js";
import { hash } from "bcrypt";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await user.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        const User = new user({ name, email, password: hashedPassword });
        await User.save();
        return res.status(200).json({ message: "OK", id: User._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map