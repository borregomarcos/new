import { IEmergencyContact } from "../emergency-contact/emergency-contact";

export interface IEmployee {
    id: number;
    firstName: string;
    lastName: String;
    salary: number;
    img: number[];
    EmergencyContact: IEmergencyContact[];
}
