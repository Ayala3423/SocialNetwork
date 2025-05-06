import Sequelize from "sequelize";
import Users from './Models/Users.js';  // הוספתי .js לקובץ המיובא
import Todos from './Models/Todos.js';  // הוספתי .js לקובץ המיובא
import Posts from './Models/Posts.js';  // הוספתי .js לקובץ המיובא
import Comments from './Models/Comments.js';  // הוספתי .js לקובץ המיובא
import Passwords from './Models/Passwords.js';  // הוספתי .js לקובץ המיובא
const models = { Users, Posts, Todos, Comments, Passwords };

const genericDAL = {
    getModelByName: (name) => models[name],

    findById: (model, id) => model.findByPk(id),

    findAll: (model) => 
        model.findAll({
            where: {
                is_deleted: false,
                deleted_at: null
            }
        }),

    createItem: (model, data) => model.create(data),

    updateFields: async (model, id, updatedFields) => {
        const item = await model.findByPk(id);
        if (item) {
            Object.assign(item, updatedFields); // מעדכן את כל השדות שהועברו
            await item.save();
        }
        return item;
    },    

    // softDelete: async (model, id) => {
    //     const item = await model.findByPk(id);
    //     if (item) {
    //         item.is_deleted = true;
    //         item.deleted_at = new Date();
    //         await item.save();
    //     }
    //     return item;
    // },

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
