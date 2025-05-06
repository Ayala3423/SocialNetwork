import service from "../../Bl/genericService.js";  // הוספתי .js לקובץ המיובא

const genericConterller = {
    get: async (req, res) => {
        try {
            const item = await service.getItem(req.query.table, req.query.id);
            if (!item) return res.status(404).json({ message: 'Not found' });
            res.status(200).json(item);
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    },

    getAll: async (req, res) => {
        try {
            const items = await service.getAllItems(req.query.table);
            res.status(200).json(items);
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    },

    post: async (req, res) => {
        try {
            const item = await service.createItem(req.query.table, req.body);
            res.status(201).json(item);
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    },

    update: async (req, res) => {
        try {
            const updated = await service.updateItemField(req.query.table, req.query.id, req.query.field, req.query.value);
            res.status(200).json(updated);
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    },

    softDelete: async (req, res) => {
        try {
            const deleted = await service.softDeleteItem(req.query.table, req.query.id);
            res.status(200).json(deleted);
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

export default genericConterller;
