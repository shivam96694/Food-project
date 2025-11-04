var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

router.get("/food_interface", function (req, res, next) {
    try{
    var data=JSON.parse(localStorage.getItem("ADMIN"))
    if(data)
    res.render('foodinterface', { message: '' })
  else
    res.render('login', { message: '' })

}
   catch(error)
   {
    res.render('login', { message: '' })

   }


})

router.get("/display_by_id_interface", function (req, res, next) {
    try{
        var data=JSON.parse(localStorage.getItem("ADMIN"))
        if(data)
            res.render('display_by_id', { message: '' })
        else
        res.render('login', { message: '' })
    
    }
       catch(error)
       {
        res.render('login', { message: '' })
    
       }
    
})

router.post("/food_submit", upload.single('poster'), function (req, res, next) {
    
    pool.query("insert into fooddata(categoryid, subcategoryid, fooditemid, Ingredient, foodprice, foodofferprice, status, foodtype, foodtaste, poster) values(?,?,?,?,?,?,?,?,?,?)", [req.body.categoryid, req.body.subcategoryid, req.body.fooditemid, req.body.Ingredient, req.body.foodprice, req.body.foodofferprice, req.body.status, req.body.foodtype, req.body.foodtaste, req.file.filename], function (error, result) {
        if (error) {
            
            res.render('foodinterface', { status: false, message: 'FAIL TO SUBMIT RECORD...' })
        }
        else {
            res.render('foodinterface', { status: true, message: 'RECORD SUBMITTED SUCCESSFULLY...' })
        }
    })
})

router.get('/display_all', function (req, res, next) {
    try{
        var data=JSON.parse(localStorage.getItem("ADMIN"))
        if(data)
   {
    pool.query("select F.*,(select C.categoryname from category C where C.categoryid=F.categoryid ) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=F.subcategoryid ) as subcategoryname,(select FD.foodname from fooditem FD where FD.fooditemid=F.fooditemid ) as foodname from fooddata F ",function (error,result) {
       
        if(error){ 
        
        res.render('displayall', { data:[]  })

    }
    else{   
                 res.render('displayall', { data:result  })
}
            

    })
}
else
{
    res.render('login', { message: '' })

}
    }
    catch(e){
        res.render('login', { message: '' })

    }
})

router.get('/display_by_id', function (req, res, next) {

    pool.query("select F.*,(select C.categoryname from category C where C.categoryid=F.categoryid ) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=F.subcategoryid ) as subcategoryname,(select FD.foodname from fooditem FD where FD.fooditemid=F.fooditemid ) as foodname from fooddata F where F.fooddataid=?",[req.query.fooddataid],function (error,result) {
        if(error)
        { console.log(error)
        res.render('displaybyid', { data:[] })
        }
        else{ 
            if(result.length==1)
            {            res.render('displaybyid', { data: result[0],status:true }) 
        }
            else{
            res.render('displaybyid', { data:[],status:false }) }
        }
    })
})

router.post("/food_edit_delete",function (req, res, next) {
    if(req.body.btn=="Edit")
        {
        
    pool.query("update fooddata set categoryid=?, subcategoryid=?, fooditemid=?, Ingredient=?, foodprice=?, foodofferprice=?, status=?, foodtype=?, foodtaste=? where fooddataid=? ", [req.body.categoryid, req.body.subcategoryid, req.body.fooditemid, req.body.Ingredient, req.body.foodprice, req.body.foodofferprice, req.body.status, req.body.foodtype, req.body.foodtaste, req.body.fooddataid], function (error, result) {
        if (error) {
            res.redirect("/food/display_all")
        }
        else {
            res.redirect("/food/display_all")        }
    });
}
    else{
        pool.query("delete from fooddata  where fooddataid=? ", [req.body.fooddataid], function (error, result) {
            if (error) {
                res.redirect("/food/display_all")
            }
            else {
                res.redirect("/food/display_all")        }
        });
    }
});


router.get("/edit_image",function (req, res, next) {
    pool.query("select F.*,(select n.foodname from fooditem n where n.fooditemid=F.fooditemid ) as foodname from fooddata F where F.fooddataid=?",[req.query.fooddataid],function (error,result) {



    res.render("editimage",{data:result[0]})
    });


});


router.post("/edit_poster",upload.single("poster"),function (req, res, next) {
     
    pool.query("update fooddata set poster=? where fooddataid=? ", [req.file.filename,req.body.fooddataid],function (error, result) {
        if (error) {console.log(error)
            res.redirect("/food/display_all")
        }
        else {
            res.redirect("/food/display_all")        }
    });
})

router.get('/login',function(req,res,next){
    res.render('login',{message:''})
});

router.post('/checklogin',function(req,res,next){
    if(req.body.emailid=="india@gmail" && req.body.pwd=="India")
    {
        res.render("foodinterface",{data:result})
    }
    else{
        res.render("login",{message:'Invalid Emailid Or Password',data:[]})
   
    }
})



module.exports = router