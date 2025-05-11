import genericDAL from "../../Dal/dal/genericDal.js";
import { capitalize } from "../utils/utils.js";

const service = {
    getItem: async (table, query) => {
        console.log(`table: ${table}`);
        const model = genericDAL.getModelByName(capitalize(table));        
        return genericDAL.findByField(model, query);
    },

    getAllItems: async (table) => {  
        console.log(`table: ${table}`);
        const model = genericDAL.getModelByName((table));
        console.log(`model: ${model}`);
        
        const data = genericDAL.findAll(model);
        console.log(`data: ${data}`);
        
        return data;
    },

    createItem: async (table, data) => {    
        const model = genericDAL.getModelByName(capitalize(table));        
        return genericDAL.createItem(model, data);
    },

    updateItemField: async (table, id, body) => {
        const model = genericDAL.getModelByName(capitalize(table));
        return genericDAL.updateFields(model, id, body);
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