import userService from "../../Bl/services/userService";

const userController = {
    signup: async (req, res) => {
        try {
            const newUser = await userService.signup(req.body);
            const token = generateToken(newUser.id, newUser.username, req.body.password);
            res.status(201).json({
                message: "User successfully registered",
                token,
                user: newUser,
            });
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    login: async (req, res) => {
        try {
            const newUser = await userService.login(req.body);
            if (!newUser) return res.status(401).json({ message: 'Invalid credentials' });
            const token = generateToken(newUser.id, newUser.username, req.body.password);
            res.status(201).json({
                message: "User successfully registered",
                token,
                user: newUser,
            });
        } catch (e) {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

export default userController;