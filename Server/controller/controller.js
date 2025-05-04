const { Users, Posts, Todos, Comments, Passwords } = require("./Models");
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    const { name, phone, username, email, password, address, company, website } = req.body;

    try {
        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            name,
            phone,
            username,
            email,
            password: hashedPassword,
            address,
            company,
            website
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};


exports.login = async (req, res) => {
    const { userName, password } = req.body;
}

exports.signup = async (req, res) => {
    const { username, password, name, address, phone, email, company, website } = req.body;

}

exports.get = async (req, res) => {

}

exports.getAll = async (req, res) => {

}

exports.post = async (req, res) => {

}

exports.update = async (req, res) => {

}

exports.delete = async (req, res) => {

}