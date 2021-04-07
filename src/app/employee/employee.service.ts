import { Employee } from './employee.model';

import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";

@Injectable()
export class EmployeeService {
  private readonly baseUrl: string = 'https://localhost:44301/api/employee';

  constructor(private http: HttpClient) { }

  //get all employees or filtering by id
  get(id?: string): Observable<Employee[]> {
    let uri = this.baseUrl;

    //retry: specify number of attempts to retry in case of error
    return this.http.get<any>(uri)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getById(id: string): Observable<Employee> {
    let uri = this.baseUrl;
    uri += '/' + id;

    //retry: specify number of attempts to retry in case of error
    return this.http.get<any>(uri)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  //handle error to show custom message
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
