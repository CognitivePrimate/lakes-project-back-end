import { ObjectId } from 'mongodb';
// import Volunteer from './volunteer';

export interface Organization {
  _id?: ObjectId;
  name: string;
  leads: object[];
  volunteers: object[];
}

export interface OrgContext {
  orgName: Organization["name"],
  orgId: Organization["_id"]
}