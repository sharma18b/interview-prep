const express = require('express')
const router = express.Router()
const {Newexp , Company} = require('../models/Company')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif' , 'images/jpg']


const all_exp_index_get = async (req, res) => {
  let exp
  try {
    exp = await Newexp.find().sort({createdAt: -1 }).limit(10).exec()
  } catch {
    exp = []
  }
  res.render('exps', { exps: exp })
}

const company_index = (req, res) => {
  Company.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('company', { companies : result, title: 'Companies List' });
    })
    .catch(err => {
      console.log("company_index me dikkt hai ");
    });
}

//
// company_create_get = (req, res) => {
//   res.render('company/companies/new', { company: new Company() })
// }

//
// company_create_post = async (req, res) => {
//   const company = new Company({
//     name: req.body.name
//   })
//   try {
//     const newCompany = await company.save()
//     // res.redirect(`authors/${newAuthor.id}`)
//     res.redirect(`company/companies`)
//   } catch {
//     res.render('company/company/new', {
//       company: company,
//       errorMessage: 'Error creating Author'
//     })
//   }
// }
//
// allexp_get = async (req, res) => {
//   let query = Newexp.find()
//   if (req.query.name != null && req.query.name != '') {
//     query = query.regex('title', new RegExp(req.query.name, 'i'))
//   }
//   if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
//     query = query.lte('publishDate', req.query.publishedBefore)
//   }
//   if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
//     query = query.gte('publishDate', req.query.publishedAfter)
//   }
//   try {
//     const books = await query.exec()
//     res.render('newexp/index', {
//       exp: exp,
//       searchOptions: req.query
//     })
//   } catch {
//     res.redirect('/company')
//   }
// }

const exp_create_get = (req, res) => {
  res.render('add_exp', { title: 'Add Experience' });
}
const exp_create_post = async (req, res) => {
  const companyname = req.body.company;
  var company_id;
    await Company.find({name : companyname}).then(result =>  {
     if (!Boolean(result.length > 0))
     {
       console.log("No such company exists so new company is being created");
       const companytest = new Company({
         name : companyname
       });
       companytest.save()
       .then(result1 => {
         console.log(result1); // result 1 is the new topic that was created
        company_id = result1._id; // extracting its id from database

       })
         .catch(err => {
           console.log(err);
           console.log("new company save hone me error hai check");
         });
     }
     else
     {
       console.log("company name matched in database");
      company_id = result[0].id;
       // const exp = new Newexp({
       //   name: req.body.name,
       //   company: company_id,
       //   branch: req.body.branch,
       //   year: req.body.year,
       //   smalldesc: req.body.smalldesc
       // });
       // console.log('bhai yha aa gya hu');
       // saveCover(exp, req.body.cover);
       // console.log('bhai yhabhi aa gya hu');
       //  exp.save()
       //   .then(result2 => {
       //     res.redirect('/company');
       //   })
       //   .catch(err => {
       //     console.log(err);
       //     console.log("exp save me error hai ");
       //  });
     }
   })
 .catch(err => { console.log("company find with topicname me error hai");});
  const exp = new Newexp({
   name: req.body.name,
   company: company_id,
   branch: req.body.branch,
   year: req.body.year,
   smalldesc: req.body.smalldesc,
   linktoblog:req.body.linktoblog
 });
 console.log('bhai yha aa gya hu');
 saveCover(exp, req.body.cover);
 console.log('bhai yhabhi aa gya hu');
 // exp.save()
 //   .then(result2 => {
 //     res.redirect('/company'); // redirecting to topic list
 //   })
 //   .catch(err => {
 //     console.log(err);
 //     console.log("exp save me error hai ki nhi check");
 //  });
 try {
    const newexp = await exp.save()
    // res.redirect(`books/${newBook.id}`)
    res.redirect(`/company`)
  } catch {
    console.log("bhai dikkt hena ")
    res.render('company');
  }
}


 const company_exps = async (req, res) => {
    console.log('inside the company exps');

    const companyname = req.params.company.toString(); // topicname on printing in console gives "binary search"
    var id = "";
    console.log(req.params.company.toString());
    console.log("inside conroller conpany_exps");
    await Company.find().then(results => {results.forEach(company => {
    if (company.name.toLowerCase() == companyname)
    {
        id = company.id;
        console.log(id);
    }
    })});
   Newexp.find({company : id })
   .then(result => {
      res.render('exps', { exps : result, title: 'Experiences List' });
    })
    .catch(err => {
      console.log("company_exps controller me dikkt hai ");
    });
 }


function saveCover(exp, coverEncoded) {
  if (coverEncoded == null) return
  //const cover = JSON.parse(coverEncoded);
  //JSON.stringify(userData)

  const cover = JSON.parse(coverEncoded);
  console.log(cover.type.toString());
  if (cover != null && imageMimeTypes.includes(cover.type.toString())) {
    exp.displayPic = new Buffer.from(cover.data, 'base64');
    exp.displayPicType = cover.type;
  }
}


module.exports = {
  all_exp_index_get,
  company_index,
  exp_create_post ,
  exp_create_get,
  company_exps,
}
