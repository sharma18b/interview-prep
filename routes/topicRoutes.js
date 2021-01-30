const express = require('express');
const topicController = require('../controllers/topicController');
const router = express.Router();


router.get('/', topicController.topic_index );
router.get('/all_questions', topicController.all_questions);

router.get('/add_ques', topicController.question_create_get);


router.post('/add_ques', topicController.question_create_post);
router.get('/:topic', topicController.topic_questions);
router.delete('/:id', topicController.question_delete);
module.exports = router;
