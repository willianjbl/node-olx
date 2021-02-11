import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
            return;
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

        const passwordHash = await bcrypt.hash(data.password, 10);
        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            passwordHash,
            token,
            state: data.state
        });

        await newUser.save();

        res.json(validateRequest(token));
    }
};

export default AuthController;
