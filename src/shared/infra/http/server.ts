import express from 'express';
import './typeorm/database';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3001, () => console.log('App runing on port 3001'));
