const express = require('express');
const companyController = require('../controllers/companyController');
const router = express.Router();



// files for picked up from documentations if they don't work multer from documentations
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
    console.log("image file filter testing level 1 ");
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
      console.log("image file filter testing level 2 ");
    } else {
      cb(null, false);
      console.log("image file filter testing level 3 ");
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



router.get('/', companyController.company_index );
router.get('/all_exps', companyController.all_exp_index_get);
router.get('/add_exp', companyController.exp_create_get);
router.post('/add_exp',upload.single('image'),companyController.exp_create_post);
router.get('/:company', companyController.company_exps);
//router.get('/:topic', companyController.exp_create_get);
module.exports = router;

