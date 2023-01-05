const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient(process.env.URI);

let excersices = async (_id, description, duration, date) => {
    try{
        const db = client.db("Excersice-Tracker");
        const usersExcersices = db.collection('Excersice-Log');

        // Check if given id is present
        const idCheck =  await usersExcersices.findOne({_id: ObjectId(_id)});
        // Check if log and count field exists
        const logCount = await usersExcersices.find({log:{$exists:true}}).toArray();
        if(idCheck){
            if(!logCount){
                usersExcersices.aggregate([{ $addFields: { count: 0, logs: [] } }]);
            }
            const update = {$push:{log : {$each:[{description:description, duration: duration, date: date}]}}, $inc:{count:1}}
            const query = {_id:ObjectId(_id)}
            await usersExcersices.updateOne(query,update);
            return usersExcersices.findOne({_id: ObjectId(_id)});
        }
    }
    catch(err){
        return `${err}`
    }
}

module.exports = excersices;