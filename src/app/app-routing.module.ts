import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { employeeComponent } from './employee/.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: "home", component: HomeComponent, children: [
      { path: "", component: DashComponent },
      { path: "employee", component: EmployeeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
