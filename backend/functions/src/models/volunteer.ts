import { ObjectId } from "mongodb";

export default interface Volunteer {
    _id?: ObjectId;
    organizations: [];
    firstName: string;
    lastName:  string;
    preferredName?: string;
    otherKnownAliases?: string[];
    email: string;
    hoursWorked?: []; //<-- how to make an array of arrays? want hours worked by year
    yearsAttended: [];
    lead: boolean;
    ICS?: number[];
    greenDot: boolean;
    isActive?: boolean;
}