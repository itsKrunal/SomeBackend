const express = require('express');
const app = express();
require('dotenv').config();
require('./Utils/dbConfig')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { TodoRouter } = require('./Routes/TodoRouter');
const { UserRouter } = require('./Routes/UserRouter');

// Configure CORS
const corsOptions = {
    origin: '*', // Allows all origins, for security purposes, consider specifying allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use('/todo', TodoRouter);
app.use('/user', UserRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
