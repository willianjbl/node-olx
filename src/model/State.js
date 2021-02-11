import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name: String,
});

const modelName = 'State';

let State = '';
if (mongoose.connection && mongoose.connection.models[modelName]) {
    State = mongoose.connection.models[modelName];
} else {
    State = mongoose.model(modelName, modelSchema);
}

export default State;
