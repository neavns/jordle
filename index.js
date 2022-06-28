import express from 'express';
import cors from 'cors';
import { resolve } from 'path';

import apiRoute from './routes/api/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.static('public'))
app.use(express.json())

app.use('/api', apiRoute)

app.get('/', (_, res) => {
  res.sendFile(resolve('./public/index.html'));
})

app.get('*', (_, res) => {
  res.send('404')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})