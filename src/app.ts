import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { uploadPdf } from './controllers/pdf-controller';
import { upload } from './middlewares/file-uploader';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.post("/upload", upload.single('file'), uploadPdf);

export default app;