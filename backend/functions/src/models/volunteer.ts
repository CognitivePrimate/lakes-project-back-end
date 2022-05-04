import { ObjectId } from "mongodb";
export default interface Volunteer {
    //FIX ANY
    _id?: ObjectId | any;
    organizations: [];
    firstName: string;
    lastName:  string;
    preferredName?: string;
    otherKnownAliases?: string[];
    email: string;
    hoursWorked?: []; //<-- how to make an array of arrays? want hours worked by year
    yearsAttended: [];
    permissionsLevel: number;
    ICS?: number[];
    greenDot: boolean;
    isActive?: boolean;
}