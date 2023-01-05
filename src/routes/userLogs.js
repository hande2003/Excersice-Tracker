const express = require("express");
const router = express.Router();
const user = require("../models/userLogs");

router
    .route('/:_id/logs')
    .get(async(req, res)=>{
      req._id = req.params._id;
      const limit = req.query.limit ? parseInt(req.query.limit) : 0;
      const from = req.query.from ? new Date(req.query.from).getTime() : 0;
      const to = req.query.to ? new Date(req.query.to).getTime() : 0;

      await user.userCompleteLog(req._id)
        .then((result) =>{
           if(result){
            let filtered=[];
            if(from!==0 & to!==0 & limit===0){
              filtered.push(...(result.log.filter(item => (item.date>=from && item.date<=to))));
            }
            else if(from===0 & to===0 & limit!==0){
              filtered.push(...(result.log.slice(0, limit)));
            }else if(from!==0 & to!==0 & limit!==0){
              filtered.push(...(result.log.filter(item => (item.date>=from & item.date<=to)).slice(0, limit)));
            }else{
              filtered.push(...(result.log));          
            }

            let final = filtered.map(item =>({
              description: item.description,
              duration: item.duration,
              date: new Date(item.date).toDateString()
        }))
       // console.log(from, to, limit, filtered);
      return res.status(200).render('exerciseLog',{
        _id: result._id,
        username: result.username,
        count:final.length,
        log:final
      })   
      }else{
        return res.status(200).render('error',{
          error: "_id not found"
        })
      } 
    })})
          
          

module.exports = router;