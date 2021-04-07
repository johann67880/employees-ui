import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeService } from './employee.service';
import { MaterialModule } from '../shared/helpers/material/material.module';


@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule
  ],
  providers: [EmployeeService]
})
export class EmployeeModule { }
