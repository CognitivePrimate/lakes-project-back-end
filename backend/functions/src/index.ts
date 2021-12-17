import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";

// import routes
// import mainRoutes from "./routes/main-routes";
import rangerDBRoutes from "./routes/ranger-db-routes";

// create instance of express
const app = express();

// enable ability to parse body of requests
app.use(express.json());

// enable cors
app.use(cors());

// add routes to application ----- CHANGE TO MAIN ROUTES DOWN THE ROAD --THIS IS FOR TESTING DB ONLY
app.use("/", rangerDBRoutes);

export const api = functions.https.onRequest(app);



// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
