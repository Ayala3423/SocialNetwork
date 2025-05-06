import Users from './Models/Users.js';  // הוספתי .js לקובץ המיובא
import Passwords from './Models/Passwords.js';  // הוספתי .js לקובץ המיובא

const userDAL = {
    findByUsername: (username) => Users.findOne({ where: { username } }),

    createUser: (userData) => Users.create(userData),

    savePassword: (userId, hashedPassword) => Passwords.create({ userId, hashedPassword }),

    getPasswordByUserId: (userId) => Passwords.findOne({ where: { userId } }),
};

export default userDAL;
