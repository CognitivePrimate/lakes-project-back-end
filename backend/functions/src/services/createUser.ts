// import admin from './firebase-service';
import { Volunteer } from '../models/volunteer'

const createUser = async (token: any): Promise<Volunteer> => {
  const nameArr = token.name.split(' ')
  const picture : string = token.picture
  const user: Volunteer = {
    uid: token.uid,
    organizations: [],
    activeOrganization: '',
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
    picture: picture
  }
  return user
}

export default createUser