import user from "../models/user.js";
import { hash, compare } from "bcrypt";
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
        const existinguser = await user.findOne({ email });
        if (existinguser) {
            return res.status(401).send("User already registered");
        }
        const hashedPassword = await hash(password, 10);
        const User = new user({ name, email, password: hashedPassword });
        await User.save();
        return res.status(201).json({ message: "OK", id: User._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const User = await user.findOne({ email });
        if (!User) {
            return res.status(401).send("User not registered");
        }
        const isPassCorr = await compare(password, User.password);
        if (!isPassCorr) {
            return res.status(403).send("Incorrect password");
        }
        return res.status(200).json({ message: "OK", id: User._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map