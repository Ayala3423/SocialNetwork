import service from "../../Bl/genericService.js";

const genericConterller = {
    get: async (req, res) => {
        try {
            const item = await service.getItem(req.params.table, req.query);
            if (!item) return res.status(404).json({ message: 'Not found' });
            res.status(200).json(item);
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    },

    getAll: async (req, res) => {
        try {
            if (Object.keys(req.query).length === 0) {
                const items = await service.getAllItems(req.params.table);
                res.status(200).json(items);
            }
            else {
                return genericConterller.get(req, res);            }
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    },

    post: async (req, res) => {
        try {
            const item = await service.createItem(req.params.table, req.body);
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
            const deleted = await service.softDeleteItem(req.params.table, req.params.id);
            res.status(200).json(deleted);
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

export default genericConterller;