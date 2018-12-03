import { Component, OnInit } from '@angular/core';
import { EmergencyContactService } from '../Services/emergency-contact.service';
import { ActivatedRoute } from '@angular/router';
import { IEmergencyContact } from './emergency-contact';
import { EmployeeService } from '../Services/employee.service';
import { IEmployee } from '../employee/employee';
declare var $:any;
declare var M:any;
@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.css']
})
export class EmergencyContactComponent implements OnInit {

  eContacts: IEmergencyContact[];
  selectedeContact:IEmergencyContact = new IEmergencyContact();
  employeeId:string ;
  lastName:string;
  firstName:string;
   
  constructor( private eCService:EmergencyContactService,private activatedRoute: ActivatedRoute,
    private emloyeeService: EmployeeService) { }

  ngOnInit() {
    this.loadData();
    $('.modal').modal();
     
  }

  delete(id: string){
    if(confirm("Do you really want to delete the Emergency Contact's data?"))
    {
    this.eCService.deleteEContact(id).subscribe(res=>this.loadData(),
    error=>console.error(error));
    }
  }

  loadData(){
    this.activatedRoute.params.subscribe(params=>this.employeeId=params["id"]);
    this.eCService.getEContacts(this.employeeId.toString()).subscribe(res=>this.eContacts=res,
      error=>console.error(error));

  }

getEmContact(id: number){
  this.eCService.getEContact(id.toString()).subscribe(res=>this.selectedeContact=res,
    error=>console.error(error));
}

  save() {
   this.eCService.putEContact(this.selectedeContact).subscribe(res=>this.closeModal(),
      error=>console.error(error));
    
  }
  closeModal()
  {
    $('#eContact').modal('close');
    M.toast({html: 'Add Successful', classes: 'rounded'});
    this.loadData();
  }

  test(){
     
    var  name:string  = "mar";
    const fd= new FormData();
    fd.append('firstName',name);
    //fd.append('number','123','mynumber');
    this.emloyeeService.postSearch (fd).subscribe(res=>console.log(res),error=>console.error(error));
   }

   ver(employee:IEmployee){
     let  a = employee.EmergencyContacts;
    console.log(a);
   }
}

