import express from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import cors from 'cors';
import config from 'config';

import router from './router.js';

const PORT = config.get('port');
const DB_URL = config.get('dbUrl');

const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use(cors());

app.use('/api/posts', router);

const start = () => {
  try {
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('MongoDB connected'));
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();