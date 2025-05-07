import Sequelize from "sequelize";
import Users from './Models/Users.js'; 
import Todos from './Models/Todos.js'; 
import Posts from './Models/Posts.js'; 
import Comments from './Models/Comments.js'; 
import Passwords from './Models/Passwords.js'; 
const models = { Users, Posts, Todos, Comments, Passwords };

const genericDAL = {
    getModelByName: (name) => models[name],

    findById: (model, id) =>
        model.findOne({
            where: {
                id,
                is_deleted: false
            }
        }),    

    findAll: (model) => 
        model.findAll({
            where: {
                is_deleted: { [Sequelize.Op.not]: true }
            }
        }),    

    createItem: (model, data) => model.create(data),

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
