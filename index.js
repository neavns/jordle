import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import bodyParser from 'body-parser';
import apiRoute from './routes/api/index.js';
import init from './utils/init.js';
import runCron from './utils/runCron.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', apiRoute)

app.get('/', (_, res) => {
  res.sendFile(resolve('./public/index.html'));
})

app.get('*', (_, res) => {
  res.send('404')
})

init()
runCron({ func: init, startNow: true })

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})