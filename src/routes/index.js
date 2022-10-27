const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const Logger = require('../config/logger');
const morgan = require('morgan');

const app = express();

const userRouter = require('./user-routes');
const categoryRouter = require('./category-routes');
const communityRouter = require('./community-routes');
const postRouter = require('./post-routes');

global.logger = Logger.createLogger({ label: 'Reddit Clone' });

app.use(helmet());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: logger.stream }));

app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/community', communityRouter);
app.use('/post', postRouter);

app.get('/', (req, res) => {
  res.send('Reddit Clone');
});

module.exports = app;
