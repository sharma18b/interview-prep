


const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser , requireAdminAuth } = require('./middleware/authMiddleware');
const blogRoutes = require('./routes/blogRoutes');
const topicRoutes = require('./routes/topicRoutes');
const adminRoutes = require('./routes/admin.router');
const companyRoutes = require('./routes/companyRoutes');
const app = express();
//const { Question , Topic } = require('./models/topic');
//const { Company , Newexp } = require('./models/Company');
//test stuff
const bodyParser = require('body-parser');


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
// view engine
app.set('view engine', 'ejs');

// some other middlewares from blogs app
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

////"admin-bro-expressjs": "^2.1.1",

const PORT1 = process.env.PORT || 3000;
console.log("the port is " + process.env.PORT)
// database connection
const dbURI = 'mongodb+srv://rishabh:87654321@cluster0.kf8tu.mongodb.net/node-auth1';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(PORT1, () => console.log(`Server is listening on port ${PORT1}...`)))
  .catch((err) => console.log(err));
  const db = mongoose.connection
  db.once('open', () => console.log('Connected to Mongoose'));

// routes
app.get('*',checkUser);
app.use('/admin',requireAdminAuth,adminRoutes);
app.use('/company',requireAuth,companyRoutes,checkUser);
app.get('/about', (req, res) => { res.render('about', { title: 'About Us' });});
app.get('/', (req, res) => res.render('home', { title: 'Home' }));
app.use('/topic', requireAuth, topicRoutes);
app.get('/profile', requireAuth, (req, res) => res.render('profile', {  title: 'Profile' }));
app.use(authRoutes);
app.use('/intexp',checkUser, blogRoutes);
// 404 page
app.use((req, res) => {res.status(404).render('404', { title: '404' });});
//////////////////////////////

