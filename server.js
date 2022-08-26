const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const volleyball = require('volleyball');
const path = require('path');

const app = express();

const port = process.env.PORT || 5008;

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

mongoose.Promise = global.Promise;
mongoose
    .connect('mongodb+srv://test:test@cluster0.ipvsdny.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {console.log('####    MongoDb connected    ####');})
    .catch(() => {console.log('Connection to db error');});

app.use(cors());
app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use('/user', authRoutes);
app.use('/product', productRoutes);

app.listen(port, () => console.log(`####    Server is running on port ${port} - work in progress    ####`));