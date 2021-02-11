import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name: String,
    slug: String,
});

const modelName = 'Category';

let Category = '';
if (mongoose.connection && mongoose.connection.models[modelName]) {
    Category = mongoose.connection.models[modelName];
} else {
    Category = mongoose.model(modelName, modelSchema);
}

export default Category;
