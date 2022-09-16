// imports from modules
import express, { NextFunction } from 'express';
import { MongoClient, ObjectId } from "mongodb";
// import firebase from 'firebase/compat/app'

import decodeIDToken from '../services/authenticateToken'
// import { createUser } from '../services/createUser';


// imports from local files
import { getClient } from "../db";
import { Volunteer, volContext } from "../models/volunteer";
import createUser from '../services/createUser';

const DBRoutes = express.Router();


// get all Volunteers in db
DBRoutes.get("/volunteerDB", (req, res) => {
    getClient().then(client => {
        return client.db().collection<Volunteer>("Volunteers").find().toArray().then(results => {
            res.json(results); //send JSON results
        });
    }).catch(err => {
        console.error("Fail", err);
        res.status(500).json({ message: "Internal Server Error" })
    });
})

// get a Volunteer by id
DBRoutes.get("/volunteerDB/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
        return client.db().collection<Volunteer>("Volunteers").findOne({ _id: new ObjectId(id) }).then(Volunteers => {
            if (Volunteers) {
                res.json(Volunteers);
            } else {
                res.status(404).json({ message: "Sorry, buckaroo. These aren't the droids you're looking for." });
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({ message: "Internal Server Error" });
    })
})

// add a Volunteer
DBRoutes.post("/volunteerDB", (req: any, res) => {
    //allows creation as long as the request body is type Volunteer && user is logged in
    const Volunteer = req.body as Volunteer;
        getClient().then(client => {
            return client.db().collection<Volunteer>("Volunteers").insertOne(Volunteer).then(result => {
                Volunteer._id = result.insertedId;
                res.status(201).json(Volunteer);
            });
        }).catch(err => {
            console.error("FAIl", err);
            res.status(500).json({ message: "Internal Server Error" });
        });
})

//verify a firebase user as app user
DBRoutes.post("/volunteerDB/tokenAuth", async (req: any, res: any, next: NextFunction) => {
    const decodedToken = await decodeIDToken(req, res, next)
    // console.log('decodedToken', decodedToken)
    const uid = decodedToken.uid;
    getClient().then(async (client: MongoClient) => {
        return await client.db().collection<Volunteer>("Volunteers").findOne({ uid }).then(async volunteer => {
            if (volunteer) {
                res.json(volunteer);
                // console.log('res.json', res.json(volunteer))
            } else {
                // res.status(404).json({ message: "Sorry, buckaroo. These aren't the droids you're looking for." });
                await createUser(decodedToken).then((user) => {
                    // console.log('newUser', user)
                    return res.json({message: 'New user Created:', user: user})
                })
                
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({ message: "Internal Server Error" });
    })
})

// update a Volunteer by id --- MIGHT NEED TO CHANGE UPDATEONE? -----NEEDS TO BE FINISHED
DBRoutes.put("/VolunteerDB/:id", (req, res) => {
    const id = req.params.id;
    console.log('id',id)
    const volunteer: Volunteer = req.body;
    delete volunteer._id
    getClient().then(client => {
        return client.db().collection<Volunteer>("Volunteers").updateOne( {_id:new ObjectId(id)}, {$set: volunteer}).then(result => {
            if (result.modifiedCount === 0) {
                res.status(404).json({message: "Nah."});
            }else{
                volunteer._id = new ObjectId(id)
                res.json(volunteer)
            }
        })
    })
})


// delete by id
DBRoutes.delete("/:id", (req, res) => {
    const id = req.params.id;
    getClient().then(client => {
        return client.db().collection<Volunteer>("Volunteers").deleteOne({ _id: new ObjectId(id) }).then(result => {
            if (result.deletedCount === 0) {
                res.status(404).json({ message: "Not Found" });
            } else {
                res.status(204).end();
            }
        });
    }).catch(err => {
        console.error("FAIL", err);
        res.status(500).json({ message: "Internal Server Error" });
    });
});




export default DBRoutes;