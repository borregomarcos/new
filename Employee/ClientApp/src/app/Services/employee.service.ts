import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IEmployee } from '../employee/employee';

@Injectable()
export class EmployeeService {
  selectedEmployee:IEmployee;
  employees: IEmployee[];

  private employeeUrl = this.baseUrl + "/api/employees"
  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl: string) {
   }
  getEmployees(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this.employeeUrl);
  }
  postEmployees(fd: FormData): Observable<IEmployee>{
    return this.http.post<IEmployee>(this.employeeUrl, fd);
  }

  /*postUpload( fd: FormData): Observable<number[]>{
    return this.http.post<number[]>(this.employeeUrl+"/upload", fd);
  }*/
  getEmployee(id: string): Observable<IEmployee>{
    let params= new HttpParams().set("emergencyContac","true");
    return this.http.get<IEmployee>(this.employeeUrl + "/" + id /*,{params: params}*/);
  }
  putEployee(fd: FormData, id: string):Observable<IEmployee> {
    return this.http.put<IEmployee>(this.employeeUrl+ "/" + id, fd);
  }
  deleteEmloyee(id: string): Observable<IEmployee>{
    return this.http.delete<IEmployee>(this.employeeUrl+"/"+id);
  }
  getImg(id: string ):Observable<Blob>{
    return this.http.get<Blob>(this.employeeUrl+"/"+"img/"+id);
  }
  
  postSearch(fd : FormData ):Observable<IEmployee[]> {  
    return this.http.post<IEmployee[]>(this.employeeUrl +"/search/",fd);
  }

}
