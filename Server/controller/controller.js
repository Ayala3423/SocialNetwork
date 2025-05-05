const { Users, Posts, Todos, Comments, Passwords } = require("./Models");
const { hashPassword, isPasswordValid } = require("../middleware/authMiddleware")

exports.signup = async (req, res) => {
    const { name, phone, username, email, password, address, company, website } = req.body;
    try {
        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        const newUser = await Users.create({
            name,
            phone,
            username,
            email,
            address,
            company,
            website
        });
        const hashedPassword = hashPassword(password);
        await Passwords.create({
            userId: newUser.id,
            hashedPassword: hashedPassword
        });
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser.id, username: newUser.username, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Users.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const passwordEntry = await Passwords.findOne({ where: { userId: user.id } });
        if (!passwordEntry) {
            return res.status(401).json({ message: 'Password not found for this user' });
        }
        const isValid = await isPasswordValid(password, passwordEntry.hashedPassword);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

exports.get = async (req, res) => {
    const { table, id } = req.query;
    const model = table.charAt(0).toUpperCase() + table.slice(1);
    try {
        const item = await model.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: `${table} with id ${id} not found` });
        }
        res.status(200).json(item);
    } catch (error) {
        console.error(`Error retrieving ${table} by ID:`, error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAll = async (req, res) => {
    const { table } = req.query;
    const model = table.charAt(0).toUpperCase() + table.slice(1);
    if (!model) {
        return res.status(400).json({ message: `Invalid table name: ${table}` });
    }
    try {
        const activeItems = await model.findAll({
            where: {
                is_deleted: false,
                deleted_at: null
            }
        });
        res.status(200).json(activeItems);
    } catch (error) {
        console.error(`Error retrieving all from ${table}:`, error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.post = async (req, res) => {
    const { table } = req.query;
    const data = req.body;
    const model = table.charAt(0).toUpperCase() + table.slice(1);
    if (!model) {
        return res.status(400).json({ message: `Invalid table name: ${table}` });
    }
    try {
        const newItem = await model.create(data);
        res.status(201).json({
            message: `${table} created successfully`,
            item: newItem
        });
    } catch (error) {
        console.error(`Error creating new ${table}:`, error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.update = async (req, res) => {
    const { table, id, field, value } = req.query;
    const model = table.charAt(0).toUpperCase() + table.slice(1);
    if (!model) {
        return res.status(400).json({ message: `Invalid table name: ${table}` });
    }
    try {
        const item = await model.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: `${table} with id ${id} not found` });
        }
        item[field] = value;
        await item.save();
        res.status(200).json({
            message: `${table} with id ${id} updated successfully`,
            item
        });
    } catch (error) {
        console.error(`Error updating ${table} with id ${id}:`, error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.softDelete = async (req, res) => {
    const { table, id } = req.query;
    const model = table.charAt(0).toUpperCase() + table.slice(1);
    if (!model) {
        return res.status(400).json({ message: `Invalid table name: ${table}` });
    }
    try {
        const item = await model.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: `${table} with id ${id} not found` });
        }
        item.is_deleted = true;
        item.deleted_at = new Date();
        await item.save();
        res.status(200).json({
            message: `${table} with id ${id} marked as deleted successfully`,
            item
        });
    } catch (error) {
        console.error(`Error soft deleting ${table} with id ${id}:`, error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.cleanup = async () => {
    const models = [Users, Posts, Todos, Comments, Passwords];
    setInterval(async () => {
        for (const model of models) {
            try {
                await model.destroy({
                    where: {
                        deleted_at: { [Sequelize.Op.lt]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
                    }
                });
                console.log(`Old deleted records cleaned up from ${model.name}`);
            } catch (error) {
                console.error(`Error cleaning up old deleted records from ${model.name}:`, error);
            }
        }
    }, 24 * 60 * 60 * 1000 * 14);
};