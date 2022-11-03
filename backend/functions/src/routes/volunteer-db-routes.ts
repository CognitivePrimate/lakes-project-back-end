// imports from modules
import express, { NextFunction } from 'express';
import { MongoClient, ObjectId } from "mongodb";
// import firebase from 'firebase/compat/app'

import decodeIDToken from '../services/authenticateToken'
// import { createUser } from '../services/createUser';


// imports from local files
import { getClient } from "../db";
import { volContext, Volunteer} from "../models/volunteer";
import createUser from '../services/createUser';
import { Organization, OrgContext } from '../models/organizations';

const DBRoutes = express.Router();


// get all Volunteers in db
DBRoutes.get("/volunteerDBAll", (req, res) => {
    console.log('req', req)
    getClient().then(client => {
        return client.db().collection<Volunteer>("Volunteers").find().toArray().then(results => {
            console.log('results', results)
            res.json(results); //send JSON results
        });
    }).catch(err => {
        console.error("Fail", err);
        res.status(500).json({ message: "Internal Server Error" })
    });
})

//gets volunteers based on active org of requesting user
DBRoutes.get("/volunteerDB", (req, res) => {
    console.log('reqHeaders', req.headers.activeorg)
    const orgString: string | string[] | undefined = req.headers.activeorg
    let activeOrg: OrgContext
    if (typeof orgString === "string" && orgString !== undefined){
        try {
            activeOrg = JSON.parse(orgString)
        } catch (e) {
            console.log(`Org Context Parsing Error: ${e}`)
        }
       
    } else {
        res.status(401).json({message: 'You are not authorized.'})
    }

    getClient().then(client => {
        return client.db().collection<Organization>("Organizations").findOne({_id: new ObjectId(activeOrg.orgId)}).then((results) => {
            console.log('results', results)
            const volunteers: volContext[] | undefined = results?.volunteers
            if (volunteers !== undefined){
                const idArray: ObjectId[] = []
                volunteers.forEach((vol) => {
                    if(vol._id !== undefined){
                        idArray.push(new ObjectId(vol._id))
                    }
                    
                })
                console.log('idArr', idArray)
                //get vols from vol collection and return
                return client.db().collection<Volunteer>("Volunteers").find({"_id": {"$in": idArray}}).toArray().then(vols => {
                    console.log('vols', vols)
                    res.json(vols)
                })
            }else {
                res.status(403).json({message: 'No.'})
                return null
            }

            // res.json(results); //send JSON results
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
    // console.log('type:', typeof decodedToken)
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
    // console.log('id',id)
    const volunteer: Volunteer = req.body;
    // console.log(volunteer)
    delete volunteer._id
    volunteer.activeOrganization = ''
    getClient().then(async client => {
        const result = await client.db().collection<Volunteer>("Volunteers").updateOne({ _id: new ObjectId(id) }, { $set: volunteer });
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: "Nah." });
        } else {
            volunteer._id = new ObjectId(id);
            console.log('resVol', volunteer);
            res.json(volunteer);
        }
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