var express = require('express');
var router = express.Router();
var pool=require("./pool")
/* GET home page. */
router.get('/fetchallcategory', function(req, res, next) {
pool.query("select * from category",function(error,result){
if(error)
{
    res.status(500).json({data:[],status:false,error})
}  
else
{
    res.status(200).json({data:result,status:true})
}

})
});


router.get('/fetchallsubcategory', function(req, res, next) {
    pool.query("select * from subcategory where categoryid=?",[req.query.categoryid],function(error,result){
    if(error)
    {
        res.status(500).json({data:[],status:false,error})
    }  
    else
    {
        res.status(200).json({data:result,status:true})
    
    }
    
    })
    
    });

    router.get('/fetchallfooditem', function(req, res, next) {
        pool.query("select * from fooditem where subcategoryid=?",[req.query.subcategoryid],function(error,result){
        if(error)
        {
            res.status(500).json({data:[],status:false,error})
        }  
        else
        {
            res.status(200).json({data:result,status:true})
        
        }
        
        })
        
        });
    
module.exports = router;
