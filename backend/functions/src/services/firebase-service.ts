import * as admin from 'firebase-admin'
const serviceAccount = require('./src/services/lof-backend-firebase-adminsdk-3tjxp-f6b788985b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.MONGO_URI
});

export default admin