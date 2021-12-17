// imports from modules
import express from "express";
import { ObjectId } from "mongodb";

// imports from local files
import { getClient } from "../db";
import Ranger from "../models/ranger";

const rangerDBRoutes = express.Router();

// get all rangers in db
rangerDBRoutes.get("/rangerDB", (req, res)=> {
    getClient().then(client => {
        return client.db().collection<Ranger>('rangers').find().toArray().then(results => {
            res.json(results); //send JSON results
        });
    }).catch(err => {
        console.error("Fail", err);
        res.status(500).json({message: "Internal Server Error"})
    });
})

// get a ranger by id
rangerDBRoutes.get("/rangerDB/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
        return client.db().collection<Ranger>("rangers").findOne({_id : new ObjectId(id)}).then(rangers => {
            if (rangers) {
                res.json(rangers);
            }else{
                res.status(404).json({message: "Sorry, buckaroo. These aren't the droids you're looking for."});
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    })
})

// add a ranger
rangerDBRoutes.post("/rangerDB", (req, res) => {
    const ranger: Ranger = req.body;
    getClient().then(client => {
        return client.db().collection<Ranger>("rangers").insertOne(ranger).then(result => {
            ranger._id = result.insertedId;
            res.status(201).json(ranger);
        });
    }).catch(err => {
        console.error("FAIl", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// update a ranger by id --- MIGHT NEED TO CHANGE UPDATEONE? -----NEEDS TO BE FINISHED
// rangerDBRoutes.put("/rangerDB/:id", (req, res) => {
//     const id = req.params.id;
//     const ranger: Ranger = req.body;
//     getClient().then(client => {
//         return client.db().collection<Ranger>("rangers").updateOne({_id: ObjectId}, ranger).then(result => {
//             if (result.modifiedCount === 0) {
//                 res.status(404).json({message: "Not Found"});
//             }else{

//             }
//         })
//     })
// })


// delete by id
rangerDBRoutes.delete("/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
      return client.db().collection<Ranger>("rangers").deleteOne({ _id: new ObjectId(id) }).then(result => {
        if (result.deletedCount === 0) {
          res.status(404).json({message: "Not Found"});
        } else {
          res.status(204).end();
        }
      });
    }).catch(err => {
      console.error("FAIL", err);
      res.status(500).json({message: "Internal Server Error"});
    });
});




export default rangerDBRoutes;