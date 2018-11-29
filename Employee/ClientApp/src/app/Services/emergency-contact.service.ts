import { Injectable, Inject } from '@angular/core';
import { IEmergencyContact } from '../emergency-contact/emergency-contact';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ImplicitReceiver } from '@angular/compiler';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmergencyContactService {
 eContact:IEmergencyContact;
 private eContactUrl = this.baseUrl + "api/EmergencyContacts";

constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

getEContacts(id: string):Observable<IEmergencyContact[]>{
    return this.http.get<IEmergencyContact[]>(this.eContactUrl+"/employee/"+id);
}
getEContact(id:string):Observable<IEmergencyContact>{
    return this.http.get<IEmergencyContact>(this.eContactUrl+"/"+id)

}
postEContact(eContact: IEmergencyContact): Observable<IEmergencyContact[]>{
    return this.http.post<IEmergencyContact[]>(this.eContactUrl, eContact);
 }

 deleteEContact(id: string ):Observable<IEmergencyContact>{
     return this.http.delete<IEmergencyContact>(this.eContactUrl +"/"+ id);
 }
 putEContact(eContact:IEmergencyContact):Observable<IEmergencyContact>{
     return this.http.put<IEmergencyContact>(this.eContactUrl+"/"+eContact.id, eContact);
 }

}
