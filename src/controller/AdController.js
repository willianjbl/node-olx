import Category from '../model/Category.js';
import validateRequest from '../validator/validateRequest.js';

const AdController = {
    getCategories: async (req, res) => {
        const cats = await Category.find();
        
        let categories = [];
        for (let i in cats) {
            categories.push({
                ...cats[i]._doc,
                img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
            });
        }

        res.json(validateRequest(categories));
    },
    addAction: async (req, res) => {

    },
    getList: async (req, res) => {

    },
    getItem: async (req, res) => {

    },
    editAction: async (req, res) => {

    }
};

export default AdController;
