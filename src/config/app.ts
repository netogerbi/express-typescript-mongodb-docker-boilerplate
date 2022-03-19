import 'express-async-errors';
import express from 'express';
import morganSetup from './morgan';
import winstonLoggerError from './winston-logger-error';
import corsSetup from './cors';
import bodyParserSetup from './body-parser';
import routesSetup from './routes';

const app = express();

morganSetup(app);
corsSetup(app);
bodyParserSetup(app);
routesSetup(app);
winstonLoggerError(app);

export default app;
