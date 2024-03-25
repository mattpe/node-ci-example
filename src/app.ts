import 'dotenv/config';
import express, {Request, Response} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import {notFound, errorHandler} from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

const app = express();

app.use(morgan('dev'));
app.use(
  helmet({
    // fix apidocs
    contentSecurityPolicy: false,
  })
); // breaks apidoc
app.use(cors());
app.use(express.json());

// serve uploaded files
app.use('/uploads', express.static('./uploads'));
// serve apidocs
app.use('/docs', express.static('./docs'));

// use generics to specify the type of the response body
app.get<{}, MessageResponse>('/', (_req: Request, res: Response) => {
  res.json({
    message: 'API location: api/v1',
  });
});

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

export default app;
