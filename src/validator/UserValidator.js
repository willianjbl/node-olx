import { checkSchema } from 'express-validator';

const UserValidator = {
    editAction: checkSchema({
        token: {
            notEmpty: true
        },
        name: {
            optional: true,
            trim: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'O nome precisa ter ao menos 2 caracteres'
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password: {
            optional: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'O nome precisa ter ao menos 2 caracteres'
        },
        state: {
            optional: true,
            notEmpty: true,
            errorMessage: 'Estado não preenchido'
        }
    })
};

export default UserValidator;
