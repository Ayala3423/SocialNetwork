const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const isPasswordValid = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
    hashPassword,
    isUsernameTaken: (user) => !!user,
    hashPassword: async (password) => await bcrypt.hash(password, 10),
    isPasswordValid
};