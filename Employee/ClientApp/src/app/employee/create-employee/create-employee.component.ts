import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import {IEmployee} from '../employee';
import { EmployeeService } from '../../Services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import {IEmergencyContact} from '../../emergency-contact/emergency-contact';
import { EmergencyContactService } from '../../Services/emergency-contact.service';
declare var M:any;
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(private fb:FormBuilder, private employeeService: EmployeeService,
     private router: Router, private activatedRoute: ActivatedRoute, private eCService: EmergencyContactService) { }

  editMode:boolean=false;
  formGroup: FormGroup;
  eContactFG: FormGroup [];
  selctedFile: File;
  emp:IEmployee;
  ecToDelete: number[] = [];
  employeeId: number; 
  countFG: number =0;
  selectedEmployee:IEmployee;
  selectedEmployeeImg:number[];
  ngOnInit() {
    this.formGroup=this.fb.group({
      firstName:'',
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')]  ), 
      salary: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]  ),
      img:'',
      emergencyContact: this.fb.array([])
    });

    this.activatedRoute.params.subscribe(paramas=>{
      if(paramas["id"] == undefined)
        {
          return;
        }
     
      this.editMode=true;
      this.employeeId=paramas["id"];
      this.employeeService.getEmployee(this.employeeId.toString()).subscribe(employee=>this.loadForm(employee),
      error=>console.error(error));
    });
  }

  loadForm(employee:IEmployee){
    
      this.formGroup.patchValue({
      firstName:employee.firstName,
      lastName:employee.lastName,
      salary:employee.salary
      
    });
    this.selectedEmployeeImg =employee.img;
    this.selectedEmployee=employee;
     
  }

  onFileSelected(event){
    this.selctedFile=<File>event.target.files[0];
  }

  async save(){
    if(this.editMode)
      { //form on edit mode 
        this.updateEmployee(this.employeeId);
        this.saveEContact();
        //M.toast({html: 'Edit Successful', classes: 'rounded'});
      }
    else
    {// form on add mode
      this.saveEpmloyee();
      M.toast({html: 'Add Successful', classes: 'rounded'});
    }
    
  }


  onSaveSuccess(){
    this.router.navigate(['/employees']);
  }

  async saveEpmloyee(){  
   await this.employeeService.postEmployees(this.loadFd()).subscribe(employee=>this.onSaveSuccess(),
      error=>console.error(error));
  }

  async updateEmployee(id: number )
  { 
    if (this.selctedFile)
    {
      let fd: FormData = this.loadFd();
      fd.append('id', id.toString());
      await this.employeeService.putEployee(fd, id.toString()).subscribe(res=>this.onSaveSuccess(),
        error=>console.error(error));
    }
    else
    {
      this.updeteEm(id);
    }

  }
async updeteEm(id: number)
{ 
  let fd: FormData = this.loadFd();
  fd.append('id', id.toString());
  await this.employeeService.putEployee(fd, id.toString())
    .subscribe(res=> this.onSaveSuccess(),
        error=>console.error(error));  
}

  addEmergencyContac() {
    let ecArr = this.formGroup.get('emergencyContact') as FormArray;
    let ecFG = this.builEmergencyContac();
    ecArr.push(ecFG);
    this.countFG++;
  }

  builEmergencyContac() {
    return this.fb.group({
      id: '0',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      employeeId: this.employeeId != null ? this.employeeId : 0
    });
  }

  removeEmergencyContac(index: number) {
    let direcciones = this.formGroup.get('emergencyContact') as FormArray;
    let direccionRemover = direcciones.at(index) as FormGroup;
    if (direccionRemover.controls['id'].value != '0') {
      this.ecToDelete.push(<number>direccionRemover.controls['id'].value);
    }
    direcciones.removeAt(index);
    this.countFG--;
  }
  saveEContact(){
    if(this.countFG>0)
    {
       let arrFG = this.formGroup.get('emergencyContact') as FormArray;
       let j=0;
       for( var i in arrFG)
       {
          let fgEContact: FormGroup= arrFG.at(j) as FormGroup;
          let eContact: IEmergencyContact = Object.assign({}, fgEContact.value);
          j++;
          this.eCService.postEContact(eContact).subscribe(res=>console.log(res),
             error=>console.error(error));
        }
      }        
  }
  loadFd(): FormData{
    let fd = new FormData;
    this.selectedEmployee =  Object.assign({}, this.formGroup.value);
    if(this.selctedFile)
    {
      fd.append('image',this.selctedFile, this.selctedFile.name);
      fd.append('firstName', this.selectedEmployee.firstName);
      fd.append('lastName', this.selectedEmployee.lastName);
      fd.append('salary', this.selectedEmployee.salary.toString());
      fd.append('img',this.selectedEmployee.img.toString());
    }
    else
    {
      fd.append('image',"");
      fd.append('firstName', this.selectedEmployee.firstName);
      fd.append('lastName', this.selectedEmployee.lastName);
      fd.append('salary', this.selectedEmployee.salary.toString());
      if(this.editMode)
      {
        fd.append('img', this.selectedEmployeeImg.toString());
      }  
      else  
      {
        fd.append('img',this.selectedEmployee.img.toString());
      }
    }
    return fd;
  }

}
