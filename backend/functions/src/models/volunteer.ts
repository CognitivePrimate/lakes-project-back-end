import { ObjectId } from "mongodb";
import { OrgContext } from "./organizations";

export interface Volunteer {
    _id?: ObjectId;
    uid: string;
    organizations: OrgContext[];
    activeOrganization?: OrgContext | '';
    firstName: string;
    lastName:  string;
    preferredName?: string;
    pronouns: string;
    otherKnownAliases?: string[];
    email: string;
    hoursWorked?: []; 
    yearsAttended: [];
    lead: boolean;
    permissionsLevel: number;
    additionalTrainings: [];
    specializations: [];
    isActive?: boolean;
    picture: string
}

export interface volContext {
    firstName: Volunteer["firstName"],
    lastName: Volunteer["lastName"],
    email: Volunteer["email"],
    _id: Volunteer["_id"]
}