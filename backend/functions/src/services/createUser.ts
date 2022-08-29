// import admin from './firebase-service';
import Volunteer from '../models/volunteer'

// export const createUser = async (token) => {
    
//     const {
//         email,
//         phoneNumber,
//         password,
//         firstName,
//         lastName,
//         photoUrl
//       } = req.body;
  
//       const user = await admin.auth().createUser({
//         email,
//         phoneNumber,
//         password,
//         displayName: `${firstName} ${lastName}`,
//         photoURL: photoUrl
//     });
  
//     return res.send(user);
// }

const createUser = async (token: any): Promise<Volunteer> => {
  const nameArr = token.name.split(' ')
  const user: Volunteer = {
    _id: '',
    uid: token.uid,
    organizations: [],
    firstName: nameArr[0],
    lastName:  nameArr[nameArr.length - 1],
    preferredName: '',
    pronouns: '',
    otherKnownAliases: [],
    email: token.email,
    hoursWorked: [],
    yearsAttended: [],
    lead: false,
    permissionsLevel: 0,
    additionalTrainings: [],
    specializations: [],
    isActive: true,
    picture: token.picture
  }
  return user
}

export default createUser