var express = require('express');
var router = express.Router();
var pool=require('./pool')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

router.get('/login_page', function(req, res, next) {
    res.render('login', { message:''});
  });

 router.get('/logout', function(req, res, next) {
   localStorage.clear()
  res.redirect('/admin/login_page')
  });

  router.post('/chk_admin_login', function(req, res, next) {
   pool.query("select * from admins where (emailid=? or mobileno=?) and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
    if(error){
      res.render('login', { message:'Database Error pls Connect With Database Aministrator'});
    }
    else{
           if(result.length==1)
     { localStorage.setItem('ADMIN',JSON.stringify(result[0]))
      res.render('dashboard', { data:result[0]});
    }
else
res.render('login', {message:'Invalid Emailid or Password...'});

    }
  })
  });

  module.exports = router;