import validateRequest from '../validator/validateRequest.js';
import User from '../model/User.js';

const AuthMiddleware = {
    private: async (req, res, next) => {
        if (!req.query.token && !req.body.token) {
            res.json(validateRequest(null, 'Access not allowed!'));
            return;
        }

        let token = '';
        if (req.query.token) {
            token = req.query.token;
        }
        if (req.body.token) {
            token = req.body.token;
        }
        if (!token) {
            res.json(validateRequest(null, 'Access not allowed!'));
            return;
        }

        const user = await User.findOne({ token });
        if (!user) {
            res.json(validateRequest(null, 'Access not allowed!'));
            return;
        }

        next();
    }
};

export default AuthMiddleware;
