import admin from './firebase-service';
// import Volunteer from '../models/volunteer'

export const createUser = async (req: any, res: any) => {
    console.log('req, res', typeof(req), typeof(res))
    const {
        email,
        phoneNumber,
        password,
        firstName,
        lastName,
        photoUrl
      } = req.body;
  
      const user = await admin.auth().createUser({
        email,
        phoneNumber,
        password,
        displayName: `${firstName} ${lastName}`,
        photoURL: photoUrl
    });
  
    return res.send(user);
}