import express from 'express';
import { ROLE } from './constants/role.constants.js';
const app = express();

app.get('/', (_, res) => res.send(ROLE))

export default app;