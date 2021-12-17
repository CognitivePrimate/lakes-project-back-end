import { ObjectId } from "mongodb";

export default interface Ranger {
    _id?: ObjectId;
    firstName: string;
    lastName:  string;
    rangerHandle: string;
    otherKnownAliases?: string[];
    email: string;
    hoursWorked?: number[]; //<-- how to make an array of arrays? want hours worked by year
    yearsAttended: number;
    khakiShadow: boolean;
    khaki: boolean;
    lead: boolean;
    ICS?: number[];
    greenDot: boolean;
    isActive?: boolean;
}