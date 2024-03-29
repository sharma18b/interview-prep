const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const company = new mongoose.Schema({
  name:
  {
  type : String,
  required:true
  },
  linkto :
  {
   type : String,
   //default : "On-campus"
 },
 linktologo:
 {
   type : String,
   default : "http://lokagraph.com/wp-content/uploads/2018/05/dunder-Mifflin-building-the-office-where-location.jpg"
 }
});

const newexp = new mongoose.Schema({
    name : {
        type: String,
        //required: true
    },
    smalldesc:
    { type: String,
     },
    branch: {
      type: String
    },
    year:
    {
    type : String
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required : [true,'Company must be specified']
      },
    linktoblog:{
        type : String
      },
    approved:{
      type: Boolean,
      default : false
    },
    social:{
      type:String,
      default:"https://www.linkedin.com/in/rishabh18b/"
    },
    img:
    {
        type: String,
        required:true,
    }
});

// newexp.virtual('displayPicPath').get(function() {
//   if (this.displayPic != null && this.displayPicType != null) {
//     return `data:${this.displayPicType};charset=utf-8;base64,${this.displayPic.toString('base64')}`
//   }
// });

const Newexp = mongoose.model('Newexp',newexp);
const Company = mongoose.model('Company', company);

module.exports = {
Newexp,
Company
};
