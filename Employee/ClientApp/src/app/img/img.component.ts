import { Component, OnInit, Inject } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { IEmployee } from '../employee/employee';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {

  constructor( private employeeService: EmployeeService, private activatedRoute: ActivatedRoute) {
   }
   employee:IEmployee;
   employeeId:string; 
   imgUrl:string;
   file:File;
   imageToShow:any;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>this.employeeId=params["id"]);
      this.employeeService.getImg(this.employeeId).subscribe(data => {
        this.imageToShow = data;
      }, error => {
        console.log(error);
      });

      
  }


}
