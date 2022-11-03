// imports from modules
import express from 'express';
import { ObjectId } from 'mongodb';
// import { MongoClient, ObjectId } from "mongodb";
// import firebase from 'firebase/compat/app'

// import { createUser } from '../services/createUser';


// imports from local files
import { getClient } from "../db";
// import Volunteer from "../models/volunteer";
import  {Organization } from '../models/organizations';

const orgRoutes = express.Router();

// add a Volunteer
orgRoutes.post("/organizationDB", (req: any, res: any) => {
  //allows creation as long as the request body is type Organization
  console.log('in API')
  const Organization = req.body as Organization
  console.log('Organization', Organization)
  try{
    getClient().then(async (client) => {
      return await client.db().collection<Organization>("Organizations").insertOne(Organization).then(result => {
          Organization._id = result.insertedId;
          res.status(201).json(Organization);
      });
    })
  } catch(err) {
    console.error("FAIl", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
      
})

// get all Volunteers in db
orgRoutes.get("/organizationDB", (req, res) => {
  getClient().then(client => {
      return client.db().collection<Organization>("Organizations").find().toArray().then(results => {
          res.json(results); //send JSON results
      });
  }).catch(err => {
      console.error("Fail", err);
      res.status(500).json({ message: "Internal Server Error" })
  });
})

// update a Volunteer by id --- MIGHT NEED TO CHANGE UPDATEONE? -----NEEDS TO BE FINISHED
orgRoutes.put("/organizationDB/:id", (req, res) => {
  const id = req.params.id;
  console.log('id',id)
  const organization: Organization = req.body;
  console.log('Reqorg', organization)
  delete organization._id
  getClient().then(async client => {
      const result = await client.db().collection<Organization>("Organizations").updateOne({ _id: new ObjectId(id) }, { $set: organization });
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "Nah." });
    } else {
      organization._id = new ObjectId(id);
      console.log('resOrg', organization);
      res.json(organization);
    }
  })
})

export default orgRoutes