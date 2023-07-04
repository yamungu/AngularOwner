import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})

export class EmployeeComponent implements OnInit,OnDestroy {
  employee:any[]=[];
  orgEmployee:any[]=[];

  filterForm:FormGroup = new FormGroup({
    search:new FormControl("",[Validators.required])
  });

  employeeForm:FormGroup = new FormGroup({
    id:new FormControl("0",[Validators.required]),
    firstName:new FormControl("",[Validators.required]),
    lastName:new FormControl("",[Validators.required]),
    email:new FormControl("",[Validators.required]),
    phone:new FormControl("",[Validators.required])
  });

  updateForm:FormGroup=new FormGroup({
    id:new FormControl("",[Validators.required]),
    firstName:new FormControl("",[Validators.required]),
    lastName:new FormControl("",[Validators.required]),
    email:new FormControl("",[Validators.required]),
    phone:new FormControl("",[Validators.required])
  });

  constructor(private employeeServ:EmployeeService) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  editEmployee(employee:any){
    this.updateForm=new FormGroup({
      id:new FormControl(employee.emp_id,[Validators.required]),
      firstName:new FormControl(employee.firstName,[Validators.required]),
      lastName:new FormControl(employee.lastName,[Validators.required]),
      email:new FormControl(employee.email,[Validators.required]),
      phone:new FormControl(employee.phone,[Validators.required])
    });
  }

  ngOnInit(): void {
    this.fetchEmployee()
  }

  filterEmployee(){
    this.employee=this.orgEmployee.filter(res=>res.employeeName.includes(this.filterForm.controls["search"].value));
  }

  fetchEmployee(){
    this.employeeServ.getEmployee().subscribe(response=>{
      this.orgEmployee=response;
      this.employee=response;
      console.log(this.employee)
    });
  }

  saveNewEmployee(){
    this.employeeServ.newEmployee(this.employeeForm.value).subscribe(response=>{
      this.fetchEmployee();
      alert("Employee has been saved");
    },error=>{
      alert("Fail to save new employee");
    })
  };

  updateEmployee(){
    this.employeeServ.updateEmployee(this.updateForm.controls["id"].value,this.updateForm.value).subscribe(response=>{
      this.fetchEmployee();
      alert("Employee has been update");
    },error=>{
      alert("Fail to update new employee");
    })
  };

  deleteEmployee(employee:any){
    this.employeeServ.deleteEmployee(employee.emp_id).subscribe(response=>{
      this.fetchEmployee();
      alert("Employee has been deleted");
    },error=>{
      this.fetchEmployee();
      alert("Fail to delete new employee");
    })
  }
}
