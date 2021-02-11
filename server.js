import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import fileupload from 'express-fileupload';
import router from './src/routes.js';

const __dirname = path.resolve();
dotenv.config();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.log(`Erro: ${error.message}`);
});

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(fileupload());

server.use(express.static(path.join(__dirname, '/public')));

server.use('/', router);

server.listen(process.env.PORT, () => {
    console.log(`Rodando em: ${process.env.BASE}`);
});
