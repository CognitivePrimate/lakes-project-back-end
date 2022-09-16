import { ObjectId } from "mongodb";
import { OrgContext } from "./organizations";

export interface Volunteer {
    _id?: ObjectId;
    uid: string;
    organizations: OrgContext[];
    activeOrganization: OrgContext | undefined;
    firstName: string;
    lastName:  string;
    preferredName?: string;
    otherKnownAliases?: string[];
    email: string;
    hoursWorked?: []; 
    yearsAttended: [];
    lead: boolean;
    permissionsLevel: number;
    ICS?: number[];
    greenDot: boolean;
    isActive?: boolean;
}

export interface volContext {
    firstName: Volunteer["firstName"],
    lastName: Volunteer["lastName"],
    email: Volunteer["email"],
    _id: Volunteer["_id"]
}