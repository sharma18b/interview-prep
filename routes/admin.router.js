

const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const mongoose = require('mongoose')
const User = require('../models/User');
const Blog = require('../models/intexpblog');
 const { Question , Topic } = require('../models/topic');
 const { Company , Newexp } = require('../models/Company');

AdminBro.registerAdapter(AdminBroMongoose)
//const User = mongoose.model('User', { name: String, email: String, surname: String })
//const Topic = mongoose.model('Topic', { name: String })


const adminBro = new AdminBro({
  databases: [mongoose],
  resourses : [User,Company,Topic,Question,Newexp,Blog],
  rootPath: '/admin',
})

//

//

const router = AdminBroExpress.buildRouter(adminBro)


module.exports = router
