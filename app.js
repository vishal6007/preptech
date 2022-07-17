const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
// const dbURI=require('./config/keys').MongoURI
mongoose.connect(process.env.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(process.env.PORT || 3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.use(authRoutes);
app.use(itemRoutes);
