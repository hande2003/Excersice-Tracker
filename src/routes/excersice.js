const express = require("express");
const router = express.Router();
const userExcersices = require("../models/userExcersiceLog");

router
    .route('/:_id/exercises')
    .post(async (req, res)=>{
        req._id = req.params._id;
        req.duration = parseInt(req.body.duration);
        req.description = req.body.description;
        req.date = req.body.date ? new Date(req.body.date).getTime() : new Date().getTime();
        
      if(req.description | req.duration){
        await userExcersices(req._id, req.description, req.duration, req.date)
        .then((result) => {   
          if(result){
            return res.status(201).render('excersiceAdded',{
              username: result.username,
              description: req.description,
              duration: req.duration,
              date: new Date(req.date).toDateString(),
              _id: req._id
          });
          }else{
            return res.status(400).render('error', {error:"_id not Found"});
          }
        })
      }
      else{
          return res.status(400).render('error', {error: "Bad request"});     
      }
    })

module.exports = router;