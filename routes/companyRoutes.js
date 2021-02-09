const express = require('express');
const companyController = require('../controllers/companyController');
const router = express.Router();

router.get('/', companyController.company_index );
router.get('/all_exps', companyController.all_exp_index_get);
router.get('/add_exp', companyController.exp_create_get);
router.post('/add_exp', companyController.exp_create_post);
router.get('/:company', companyController.company_exps);
//router.get('/:topic', companyController.exp_create_get);
module.exports = router;
