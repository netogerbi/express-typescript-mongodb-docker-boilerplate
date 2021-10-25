import bunyan from 'bunyan';
import bunyanFormat from 'bunyan-format';
import env from './env';

const logger = bunyan.createLogger({
  name: 'Account-API - v2 //',
  stream: bunyanFormat({ outputMode: 'long' }),
});

if (env.nodeEnv === 'test') {
  logger.level(bunyan.FATAL + 1);
}

export default logger;
