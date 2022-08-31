//From Firebase AdminSDK
const admin = require('firebase-admin');

//i cut next from req,res,next in arguments. maybe need to put back?
async function decodeIDToken(req: any, res: any, next: any) {
  const header = await req.headers?.authorization;
  // console.log('decodeFunc_req:', req.headers)
  if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
          const decodedToken = await admin.auth().verifyIdToken(idToken);
          req['currentUser'] = decodedToken;
          return decodedToken
        } catch (err) {
          console.log(err);
        }
  }
    // next();
}

export default decodeIDToken;