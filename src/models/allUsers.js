const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient(process.env.URI);
//const userLog = require("./userExcersiceLog");

const db = client.db("Excersice-Tracker");
const users = db.collection('Users');
const userLogs = db.collection('Excersice-Log');

let allUsers = async () => {
    try{       
        return users.find({}).toArray();
    }
    catch(err){
        return `${err}`;
    }
}

let latestUser = async () =>{
  try{
    //console.log(users.find({}).sort({_id:-1}).limit(1));
    return users.find({}, {username:0}).sort({_id:-1}).limit(1).toArray();
  }
  catch(err){
    return `${err}`;
  }
}

module.exports = {allUsers, latestUser};