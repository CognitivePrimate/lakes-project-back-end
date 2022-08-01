import {MongoClient} from "mongodb";
import * as functions from "firebase-functions";

// const uri = functions.config().mongodb.uri || "";
// const functions = require("firebase-functions");
// const { MongoClient } = require("mongodb");

const uri: string = functions.config().mongodb.uri;

if (!uri){
    console.error("Error: Missing environment variable MONGO_URI");
}

let client:MongoClient = new MongoClient(uri);

export const getClient = async () => {
    await client.connect();
    return client;
}