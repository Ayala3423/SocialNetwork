import genericDAL from "../Dal/genericDal.js"; // הוספתי .js לקובץ המיובא

const service = {
    getItem: async (table, id) => {
        const model = genericDAL.getModelByName(capitalize(table));
        return genericDAL.findById(model, id);
    },

    getAllItems: async (table) => {
        const model = genericDAL.getModelByName(capitalize(table));
        return genericDAL.findAll(model);
    },

    createItem: async (table, data) => {
        const model = genericDAL.getModelByName(capitalize(table));
        return genericDAL.createItem(model, data);
    },

    updateItemField: async (table, id, body) => {
        const model = genericDAL.getModelByName(capitalize(table));
        return genericDAL.updateFields(model, id, {[body.field]: body.value});
    },

    softDeleteItem: async (table, id) => {
        const model = genericDAL.getModelByName(capitalize(table));
        return genericDAL.updateFields(model, id, {
            is_deleted: true,
            deleted_at: new Date()
        });
    },

    cleanup: () => {
        setInterval(() => {
            genericDAL.cleanupOldDeleted();
        }, 14 * 24 * 60 * 60 * 1000);
    }
};

export default service;

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}