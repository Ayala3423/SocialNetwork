import userDAL from "../Dal/userDal.js";
import { hashPassword, isPasswordValid } from "../Bl/middleware/authMiddleware.js";

const userService = {
    signup: async (userData) => {
        console.log("123456789");
        
        
        const { username, password, ...rest } = userData;
        
        const existingUser = await userDAL.findByUsername(username);

        if (existingUser) {
            throw new Error("Username already taken");
        }
        
        const newUser = await userDAL.createUser({ username, ...rest });
        console.log(newUser);
        console.log(password);
        
        const hashed = await hashPassword(password);
        console.log("hashed1", hashed);
        
        await userDAL.savePassword(newUser.id, hashed);
        return newUser;
    },

    login: async ({ username, password }) => {
        const user = await userDAL.findByUsername(username);
        
        if (!user) return null;

        const passwordEntry = await userDAL.getPasswordByUserId(user.id);
        console.log(passwordEntry);

        if (!passwordEntry) return null;

        const valid = await isPasswordValid(password, passwordEntry.Password);
        console.log(valid);
        
        return valid ? user : null;
    }
};

export default userService;
