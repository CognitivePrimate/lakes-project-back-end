//From Firebase AdminSDK
const admin = require('firebase-admin');

async function decodeIDToken(req: any, res: any, next: any) {
  console.log('types:', typeof(req), typeof(res), typeof(next))
  const header = req.headers?.authorization;
  if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
          const decodedToken = await admin.auth().verifyIdToken(idToken);
          req['currentUser'] = decodedToken;
          console.log('BE decodedToken', decodedToken)
        } catch (err) {
          console.log(err);
        }
  }
    next();
}

export default decodeIDToken;