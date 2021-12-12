const Blog = require('../models/intexpblog');

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('intexpblogslist', { blogs : result, title: 'Interview Exp.' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Specific Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    });
}

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Share Your Personnel Experience' });
}

// const blog_create_post = (req, res) => {
//   const blog = new Blog(req.body);
//   blog.save()
//     .then(result => {
//       res.redirect('/intexp');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }
const blog_create_post = (req, res) => {
  // console.log(req.file);
  const path1 = req.file.path.replace(/\\/g, '/');
  // console.log(path1);
  const final_path = path1.slice(7);
  // console.log(final_path + 'after slicing the path');
  const blog = new Blog({
      title: req.body.title,
      snippet: req.body.snippet,
      body: req.body.body,
      img: final_path
  });
  blog.save()
    .then(result => {
      //   console.log(result);
      res.redirect('/intexp');
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/intexp' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete
}