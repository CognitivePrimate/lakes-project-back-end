// imports from modules
import express from 'express';
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

export default orgRoutes