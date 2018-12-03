import { IEmergencyContact } from "../emergency-contact/emergency-contact";

export interface IEmployee {
    id: number;
    firstName: string;
    lastName: string;
    salary: number;
    img: number[];
    EmergencyContacts: IEmergencyContact[];
}
