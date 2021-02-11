import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    idUser: String,
    state: String,
    category: String,
    images: [Object],
    dateCreated: Date,
    title: String,
    price: Number,
    negotiable: Boolean,
    description: String,
    views: Number,
    status: String
});

const modelName = 'Ad';

let Ad = '';
if (mongoose.connection && mongoose.connection.models[modelName]) {
    Ad = mongoose.connection.models[modelName];
} else {
    Ad = mongoose.model(modelName, modelSchema);
}

export default Ad;