const jwt = require('jsonwebtoken');
const User = require('../models/User');
const adminlist = require('../models/admins');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'rishabh secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const requireAdminAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'rishabh secret', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/home');
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        console.log(user.email);
        if (adminlist.includes(user.email))
        {
          next();
        }
        else
       {console.log("You are not an admin boii fuck off");res.redirect('/');}
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check the current user
const checkUser = (req,res,next) =>{
    const token = req.cookies.jwt;
    if (token) {
    jwt.verify(token, 'rishabh secret',async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        console.log(user.email);
        next();
      }
    });
    }
    else
    {
        res.locals.user = null;
        next();

    }
    }


module.exports = { requireAuth , checkUser , requireAdminAuth};
