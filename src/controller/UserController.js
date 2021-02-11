import State from '../model/State.js';
import validateRequest from '../validator/validateRequest.js';

const UserController = {
    getStates: async (req, res) => {
        let states = await State.find();
        res.json(validateRequest(states));
    },
    info: async (req, res) => {

    },
    editAction: async (req, res) => {

    }
};

export default UserController;
