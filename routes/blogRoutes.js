const express = require('express');
const blogController = require('../controllers/blogController');
const path = require('path');
const router = express.Router();
const Blog = require('../models/intexpblog');
//some work related to image upload do not change it 
var multer = require('multer');
 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "./public/uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    // console.log("testing1");
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
     // console.log("testing`2");
    } else {
      cb(null, false);
      // console.log("testing`3");
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  }
  );


router.get('/create', blogController.blog_create_get);
router.get('/', blogController.blog_index);
router.post('/',upload.single('image'), blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

module.exports = router;