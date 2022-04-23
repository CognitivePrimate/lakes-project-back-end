// imports from modules
import express from "express";
import { ObjectId } from "mongodb";

// imports from local files
import { getClient } from "../db";
import Volunteer from "../models/volunteer";

const DBRoutes = express.Router();


// get all Volunteers in db
DBRoutes.get("/volunteerDB", (req, res)=> {
    getClient().then(client => {
        return client.db().collection<Volunteer>('Volunteers').find().toArray().then(results => {
            res.json(results); //send JSON results
        });
    }).catch(err => {
        console.error("Fail", err);
        res.status(500).json({message: "Internal Server Error"})
    });
})

// get a Volunteer by id
DBRoutes.get("/volunteerDB/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
        return client.db().collection<Volunteer>("Volunteers").findOne({_id : new ObjectId(id)}).then(Volunteers => {
            if (Volunteers) {
                res.json(Volunteers);
            }else{
                res.status(404).json({message: "Sorry, buckaroo. These aren't the droids you're looking for."});
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    })
})

// add a Volunteer
DBRoutes.post("/volunteerDB", (req, res) => {
    const Volunteer: Volunteer = req.body;
    getClient().then(client => {
        return client.db().collection<Volunteer>("Volunteers").insertOne(Volunteer).then(result => {
            Volunteer._id = result.insertedId;
            res.status(201).json(Volunteer);
        });
    }).catch(err => {
        console.error("FAIl", err);
        res.status(500).json({message: "Internal Server Error"});
    });
})

// update a Volunteer by id --- MIGHT NEED TO CHANGE UPDATEONE? -----NEEDS TO BE FINISHED
// DBRoutes.put("/VolunteerDB/:id", (req, res) => {
//     const id = req.params.id;
//     const Volunteer: Volunteer = req.body;
//     getClient().then(client => {
//         return client.db().collection<Volunteer>("Volunteers").updateOne({_id: ObjectId}, Volunteer).then(result => {
//             if (result.modifiedCount === 0) {
//                 res.status(404).json({message: "Not Found"});
//             }else{

//             }
//         })
//     })
// })


// delete by id
DBRoutes.delete("/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
      return client.db().collection<Volunteer>("Volunteers").deleteOne({ _id: new ObjectId(id) }).then(result => {
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




export default DBRoutes;