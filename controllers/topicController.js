const { Question , Topic } = require('../models/topic');

const topic_index = (req, res) => {
  Topic.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('topic', { topics : result, title: 'Topics List' });
    })
    .catch(err => {
      console.log("topic_index me dikkt hai ");
    });
}

const all_questions = (req, res) => {
  Question.find({approved:true}).sort({ createdAt: -1 })
    .then(result => {
      res.render('questions', { questions : result, title: 'Question List' });
    })
    .catch(err => {
      console.log("Question all me dikkt hai ");
    });
}


 const topic_questions = async (req, res) => {
    console.log('inside the topic questions')
    const topicname = req.params.topic.toString(); // topicname on printing in console gives "binary search"
    var id = "";
    await Topic.find().then(results => {results.forEach(topic => {
    if (topic.name.toLowerCase() == topicname)
    {
        id = topic.id;
        console.log(id);
    }
    })});
   Question.find({topic : id ,approved:true })
   .then(result => {
      res.render('questions', { questions : result, title: 'Questions List' });
    })
    .catch(err => {
      console.log("topic_questions controller me dikkt hai ");
    });
 }


 const question_create_post = async (req, res) => {
   console.log(req.body);
   const hell = req.body;  // extracting info to create question
   const quesprob = hell.problem;
   const topicname = hell.topic;
   const linktoques = hell.linkto;
   console.log(topicname); // if topic already exists then it would not create a new topic else it will create a new topic
   //var topic_id;
  await Topic.find({name : topicname}).then(result => {
     if (!Boolean(result.length > 0))
     {

       console.log("No such topic exists so new topic is being created");
       const topictest = new Topic({
         name : topicname
       });
       topictest.save()
       .then(result1 => {
         console.log(result1); // result 1 is the new topic that was created
         var topic_id = result1._id; // extracting its id from database
         const new_ques = new Question({problem : quesprob, linkto : linktoques, topic : topic_id });
         new_ques.save()
           .then(result2 => {
             res.redirect('/topic'); // redirecting to topic list
           })
           .catch(err => {
             console.log(err);
             console.log("ques save me error hai ki nhi check");
          });
       })
         .catch(err => {
           console.log(err);
           console.log("new topic save hone me error hai check");
         });
     }
     else
     {
       console.log("topic name matched in database");
       var topic_id = result[0].id;
       const new_ques = new Question({problem : quesprob, linkto : linktoques, topic : topic_id });
       new_ques.save()
         .then(result2 => {
           res.redirect('/topic');
         })
         .catch(err => {
           console.log(err);
           console.log("ques save me error hai ki nhi check");
        });
     }
   }).catch(err => { console.log("topic find with topicname me error hai");});
 }

 const question_create_get = (req, res) => {
   res.render('add_ques', { title: 'Add Question' });
 }
 const question_delete = (req, res) => {
   const id = req.params.id;
   Question.findByIdAndDelete(id)
     .then(result => {
       res.json({ redirect: '/topic' });
     })
     .catch(err => {
       console.log(err);
       console.log("Question delete me dikkkt hai yaha dekh");

     });
 }



module.exports = {
  topic_index,
  topic_questions,
  all_questions,
  question_create_post,
  question_delete,
  question_create_get
}
