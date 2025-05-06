import userService from "../../Bl/userService.js";  

const userController = {
    signup: async (req, res) => {
        try {  
            const newUser = await userService.signup(req.body);
            res.status(201).json({ message: 'User registered', user: newUser });
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    login: async (req, res) => {
        try {
            const user = await userService.login(req.body);
            console.log(user);
            
            if (!user) return res.status(401).json({ message: 'Invalid credentials' });
            res.status(200).json({ message: 'Login successful', user });
        } catch (e) {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

export default userController;