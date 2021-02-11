import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name: String,
    email: String,
    state: String,
    passwordHash: String,
    token: String
});

const modelName = 'User';

let User = '';
if (mongoose.connection && mongoose.connection.models[modelName]) {
    User = mongoose.connection.models[modelName];
} else {
    User = mongoose.model(modelName, modelSchema);
}

export default User;
