import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
const admin = require('firebase-admin')
admin.initializeApp();


// import routes
// import mainRoutes from "./routes/main-routes";
import DBRoutes from "./routes/volunteer-db-routes";


//to decode token from firebase
// const decodeIDToken = require('./authenticateToken')
// create instance of express
const app = express();
// app.use(decodeIDToken)

// enable ability to parse body of requests
app.use(express.json());
// app.use(decodeIDToken);

// enable cors
app.use(cors());

// add routes to application ----- CHANGE TO MAIN ROUTES DOWN THE ROAD --THIS IS FOR TESTING DB ONLY
app.use("/", DBRoutes);

export const api = functions.https.onRequest(app);

// export const decodeIDToken = async (req: Request, res: Response, next: NextFunction) => {
//     if (req.headers?.authorization?.startsWith('Bearer ')) {
//       const idToken = req.headers.authorization.split('Bearer ')[1];
  
//       try {
//         const decodedToken = await admin.auth().verifyIdToken(idToken);
//         req['currentUser'] = decodedToken;
//       } catch (err) {
//         console.log(err);
//       }
//     }
  
//     next();
//   }



// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
