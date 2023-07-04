import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const url4=environment.basePath+"api/v1/employee";
  
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  getEmployee(){
    return this.http.get<any[]>(`${url4}`);
  }
  newEmployee(data:any){
    return this.http.post(`${url4}`,data);
  }
  updateEmployee(id:any,data:any){
    return this.http.put(`${url4}/${id}`,data);
  }
  deleteEmployee(id:any){
    return this.http.delete(`${url4}/${id}`);
  }
}
