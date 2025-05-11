import genericDAL from "../../Dal/dal/genericDal.js";
import { capitalize } from "../utils/utils.js";

const service = {
    getItem: async (table, query) => {
        console.log(`query: ${JSON.stringify(query)}`);
        console.log(`table: ${table}`);
        const model = genericDAL.getModelByName((table));
        console.log(`model123: ${JSON.stringify(model)}`);
                
        return genericDAL.findByField(model, query);
    },

    getAllItems: async (table) => {  
        console.log(`table: ${table}`);
        const model = genericDAL.getModelByName((table));    
        console.log(`model: ${JSON.stringify(model)}`);
        
        const data = genericDAL.findAll(model);
        console.log(`data: ${JSON.stringify(data)}`);
        
        return data;
    },

    getItemById: async (table, id) => {
        const model = genericDAL.getModelByName(capitalize(table));
        return genericDAL.findById(model, id);
    },

    getNestedItems: async (base, id, nested, query) => {
        const baseModel = genericDAL.getModelByName(capitalize(base));
        const nestedModel = genericDAL.getModelByName(capitalize(nested));
        return genericDAL.findNested(baseModel, id, nestedModel, query);
    },

    createItem: async (table, data) => {
        console.log(`table: ${table}`);
        console.log(`data: ${data}`);
        
        const model = genericDAL.getModelByName((table));        
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