import { Employee } from './employee.model';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnsubscribeComponent } from '../shared/helpers/unsubscribe.component';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent extends UnsubscribeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort, {static: false})
  sort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'contractTypeName', 'roleId', 'roleName', 'roleDescription', 'hourlySalary', 'monthlySalary', 'salary'];
  dataSource = new MatTableDataSource<Employee>();
  loading: boolean = false;
  filter : string = '';

  constructor(private employeeService: EmployeeService, private changeDetectorRefs: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    //ANOTHER WAY: filter data by custom column
    // this.dataSource.filterPredicate = function(data, filter: string): boolean {
    //   return data.id.toString() === filter;
    // };

    this.getEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  //function to get all employees and also specifies, sorting, paginator, and so forth.
  getEmployees(): void {
    this.loading = true;

    this.employeeService.get().subscribe(employees => {
      this.dataSource = new MatTableDataSource<Employee>(employees);
      this.loading = false;
      this.changeDetectorRefs.detectChanges();
    });
  }

  //retrieves the employee that matches with Id Parameter
  getEmployeeById(id: string): void {
    this.loading = true;

    this.employeeService.getById(id).subscribe(employee => {
      let emp = employee ? [employee] : [];
      this.dataSource = new MatTableDataSource<Employee>(emp);
      this.loading = false;
      this.changeDetectorRefs.detectChanges();
    });
  }

  clear() {
    this.filter = '';
    this.dataSource.filter = this.filter;
  }

  //filter data by the specific criteria typed by user
  applyFilter(event: Event): void {
    this.loading = true;

    //Uncomment to see native filtering of angular table
    //const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();

    if(!this.filter) {
      this.getEmployees();
      return;
    }

    this.getEmployeeById(this.filter);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.loading = false;
  }
}
