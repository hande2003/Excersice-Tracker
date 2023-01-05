const {MongoClient} = require("mongodb");
const client = new MongoClient(process.env.URI);
const userLog = require("./userExcersiceLog");

let newUser = async (username) => {
    try{
        const db = client.db("Excersice-Tracker");
        const users = db.collection('Users');
        const userLog = db.collection('Excersice-Log');
        // Query for a movie that has the title 'Back to the Future'
        const user = {username: username};
        const result = await users.insertOne(user);
        await userLog.insertOne(user);
        return result;
    }
    catch(err){
        return `${err}`
    }
}

module.exports = newUser;