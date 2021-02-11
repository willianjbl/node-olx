import mongoose from 'mongoose';
import { validationResult, matchedData } from 'express-validator';
import validateRequest from '../validator/validateRequest.js';
import User from '../model/User.js';
import State from '../model/State.js';

const AuthController = {
    signin: async (req, res) => {

    },
    signup: async (req, res) => {
        const errors = validationResult(req, res);

        if (!errors.isEmpty()) {
            res.json(validateRequest(null, 'Os campos não foram preenchidos corretamente', errors.mapped()));
            return;
        }

        const data = matchedData(req);

        const user = await User.findOne({
            email: data.email
        });
        if (user) {
            res.json(validateRequest(null, 'E-mail já existe'));
        }

        if (mongoose.Types.ObjectId.isValid(data.state)) {
            const stateItem = await State.findById(data.state);
            if (!stateItem) {
                res.json(validateRequest(null, 'Estado não existe'));
                return;
            }
        } else {
            res.json(validateRequest(null, 'Código de estado inválido'));
            return;
        }

        res.json(validateRequest(data));
    }
};

export default AuthController;
