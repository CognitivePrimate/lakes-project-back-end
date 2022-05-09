//From Firebase AdminSDK
const admin = require('firebase-admin');
const serviceAccount = require('./lof-backend-firebase-adminsdk-3tjxp-f6b788985b.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: MONGO_URI
});
async function decodeIDToken(req, res, next) {
  const header = req.headers?.authorization;
  if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {
const idToken = req.headers.authorization.split('Bearer ')[1];
try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }
next();
}
module.exports = decodeIDToken;