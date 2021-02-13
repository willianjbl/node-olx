import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import State from '../model/State.js';
import User from '../model/User.js';
import Category from '../model/Category.js';
import Ad from '../model/Ad.js';
import { validationResult, matchedData } from 'express-validator';
import validateRequest from '../validator/validateRequest.js';

const UserController = {
    getStates: async (req, res) => {
        let states = await State.find();
        res.json(validateRequest(states));
    },
    info: async (req, res) => {
        let token = req.query.token;
        const user = await User.findOne({ token });
        const state = await State.findById(user.state);
        const ads = await Ad.find({ idUser: user._id.toString() });
        let adList = [];
        for (let i in ads) {
            const cat = await Category.findById(ads[i].category);
            adList.push({ ...ads[i], category: cat.slug });
        }

        res.json(validateRequest({
            name: user.name,
            email: user.email,
            state: state.name,
            ads: adList
        }));
    },
    editAction: async (req, res) => {
        const errors = validationResult(req, res);
        if (!errors.isEmpty()) {
            res.json(validateRequest(null, 'Os campos não foram preenchidos corretamente', errors.mapped()));
            return;
        }

        const data = matchedData(req);
        const user = await User.findOne({ token: data.token });
        
        let updated = {};
        if (data.name) {
            updated.name = data.name
        }
        if (data.email) {
            const emailCheck = await User.findOne({ email: data.email });
            if (emailCheck) {
                res.json(validateRequest(null, 'Email já existe!'));
                return;
            }
            updated.email = data.email;
        }
        if (data.state) {
            if (mongoose.Types.ObjectId.isValid(data.state)) {
                const stateCheck = await State.findById(data.state);
                if (!stateCheck) {
                    res.json(validateRequest(null, 'estado não existe!'));
                    return;
                }
                updated.state = data.state;
            } else {
                res.json(validateRequest(null, 'Id de estado inválido!'));
                return;
            }
        }
        if (data.password) {
            updated.passwordHash = await bcrypt.hash(data.password, 10);
        }

        await User.findOneAndUpdate({ token: data.token }, { $set: updated });

        res.json(validateRequest({ message: 'Success' }));
    }
};

export default UserController;
