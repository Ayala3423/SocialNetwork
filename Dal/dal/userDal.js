import Users from '../Models/Users.js';  // הוספתי .js לקובץ המיובא
import Passwords from '../Models/Passwords.js';  // הוספתי .js לקובץ המיובא

const userDAL = {
    findByUsername: (username) => Users.findOne({ where: { username } }),

    createUser: (userData) => {
        console.log("Creating user with data:", JSON.stringify(userData, null, 2));
        return Users.create(userData);
    },

    savePassword: (userId, hashedPassword) => {
        console.log({ userId, hashedPassword });
        Passwords.create({ userId, Password: hashedPassword });
    },

    getPasswordByUserId: (userId) => Passwords.findOne({ where: { userId } }),
};

export default userDAL;
