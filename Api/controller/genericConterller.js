import service from "../../Bl/services/genericService.js";

const genericConterller = {
    
    getAllOrByValue: async (req, res) => {
        try {
            console.log("req.params", req.query, req.params.table);
            if (Object.keys(req.query).length == 0) {
                const items = await service.getAllItems(req.params.table);                
                return res.status(200).json(items);
            } else {
                const item = await service.getItem(req.params.table, req.query);
                res.status(200).json(item);
            }
        } catch (error) {
            console.error("Error in getAllOrByValue:", error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    // get: async (req, res) => {
    //     try {
    //         console.log("req.params", req.query, req.params.table);
            
    //         const item = await service.getItem(req.params.table, req.query);
    //         console.log(item);

    //         res.status(200).json(item);
    //     } catch {
    //         res.status(500).json({ message: 'Server error' });
    //     }
    // },

    // getAll: async (req, res) => {
    //     try {
    //         if (Object.keys(req.query).length === 0) {

    //             const items = await service.getAllItems(req.params.table);
    //             console.log("all items", items);

    //             return res.status(200).json(items);
    //         }
    //         else {
    //             return genericConterller.get(req, res);
    //         }
    //     } catch {
    //         res.status(500).json({ message: 'Server error' });
    //     }
    // },

    getById: async (req, res) => {
        try {
            const item = await service.getItemById(req.params.table, req.params.id);
            res.status(200).json(item);
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    },

    getNested: async (req, res) => {
        try {
            const { base, id, nested } = req.params;
            const item = await service.getNestedItems(base, id, nested, req.query);
            res.status(200).json(item);
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    },

    post: async (req, res) => {
        try {            
            console.log("ayala", req.params.table, req.body);
            const item = await service.createItem(req.params.table, req.body);
            console.log("item", item);
            res.status(201).json(item);
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    },

    update: async (req, res) => {
        try {
            console.log(req.body);

            const updated = await service.updateItemField(req.params.table, req.params.id, req.body);
            res.status(200).json(updated);
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    },

    softDelete: async (req, res) => {
        try {
            console.log("hello", req.params.table, req.params.id);

            const deleted = await service.softDeleteItem(req.params.table, req.params.id);
            res.status(200).json(deleted);
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

export default genericConterller;