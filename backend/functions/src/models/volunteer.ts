import { ObjectId } from "mongodb";
import Organization from "./organizations";

export default interface Volunteer {
    //FIX ANY
    _id?: ObjectId | any;
    uid: string;
    organizations: Organization[];
    activeOrganization: Organization | undefined;
    firstName: string;
    lastName:  string;
    preferredName?: string;
    pronouns: string
    otherKnownAliases?: string[];
    email: string;
    hoursWorked?: []; 
    yearsAttended: [];
    lead: boolean;
    permissionsLevel: number;
    additionalTrainings?: string[];
    specializations: string[];
    isActive?: boolean;
    picture: string
}

