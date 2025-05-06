import userDAL from "../Dal/userDal.js"; // הוספתי .js לקובץ המיובא
import { hashPassword, isPasswordValid } from "../Bl/middleware/authMiddleware.js"; // הוספתי .js

const userService = {
    signup: async (userData) => {
        const { username, password, ...rest } = userData;
        const existingUser = await userDAL.findByUsername(username);
        if (existingUser) {
            throw new Error("Username already taken");
        }
        const newUser = await userDAL.createUser(rest);
        const hashed = hashPassword(password);
        await userDAL.savePassword(newUser.id, hashed);
        return newUser;
    },

    login: async ({ username, password }) => {
        const user = await userDAL.findByUsername(username);
        if (!user) return null;

        const passwordEntry = await userDAL.getPasswordByUserId(user.id);
        if (!passwordEntry) return null;

        const valid = await isPasswordValid(password, passwordEntry.hashedPassword);
        return valid ? user : null;
    }
};

export default userService;
