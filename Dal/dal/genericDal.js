import Sequelize from "sequelize";
import Users from '../Models/Users.js';
import Todos from '../Models/Todos.js';
import Posts from '../Models/Posts.js';
import Comments from '../Models/Comments.js';
import Passwords from '../Models/Passwords.js';
const models = { Users, Posts, Todos, Comments, Passwords };

const genericDAL = {
    getModelByName: (name) => {
        return models[name]
    },

    findByField: (model, query) => {
        const field = Object.keys(query)[0];
        const value = query[field];        
        return model.findAll({
            where: {
                [field]: value,
                is_deleted: 1
            }
        });
    },

    findAll: (model) => {

        return model.findAll({
            where: {
                is_deleted: { [Sequelize.Op.not]: false }
            }
        })
    },

    findById: (model, id) => {
        return model.findOne({
            where: {
                id,
                is_deleted: false
            }
        });
    },

    findNested: async (baseModel, id, nestedModel, query) => {
        const baseInstance = await baseModel.findByPk(id, {
            include: {
                model: nestedModel,
                where: {
                    ...query,
                    is_deleted: false
                },
                required: false
            }
        });
        return baseInstance;
    },

    createItem: (model, data) => {
        console.log(`model10: ${model}`);
        console.log(`data10: ${data}`);
        
        return model.create(data)},

    updateFields: async (model, id, updatedFields) => {
        const item = await model.findByPk(id);
        if (item) {
            Object.assign(item, updatedFields);
            await item.save();
        }
        return item;
    },

    cleanupOldDeleted: async () => {
        for (const modelName in models) {
            const model = models[modelName];
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
    }
};

export default genericDAL;
