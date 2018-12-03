import { Component, OnInit } from '@angular/core';
import {IEmployee} from './employee';
import {EmployeeService} from '../Services/employee.service';
import { async } from '@angular/core/testing';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: IEmployee[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() { 
        
      this.loadData();
  }

  delete(id: string){
    if(confirm("Do you really want to delete the Employee's data?"))
    {
    this.employeeService.deleteEmloyee(id).subscribe(res=>this.loadData(),
    error=>console.error(error));
    }
  }
   
  loadData()
  {
    this.employeeService.getEmployees().subscribe(res => this.employees=res,
      error => console.error(error));
  }
  
  

  onSearchChange(searchValue : string ) {  
    if(searchValue)
    {
      let fd  = new FormData();
      fd.append('firstName',searchValue);
      this.employeeService.postSearch(fd).subscribe(res=>this.employees= res,
        error=>console.error(error));
    }
    else{
      this.loadData();
    }
    
  }
  
}
