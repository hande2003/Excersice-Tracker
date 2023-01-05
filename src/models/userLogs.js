const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient(process.env.URI);
//const userLog = require("./userExcersiceLog");

const db = client.db("Excersice-Tracker");
//const users = db.collection('Users');
const userLogs = db.collection('Excersice-Log');

const userCompleteLog = async (_id) =>{
  try{
   return userLogs.findOne({_id:ObjectId(_id)});
  }
  catch(err){
    return `${err}`;
  }
}

module.exports = {userCompleteLog}