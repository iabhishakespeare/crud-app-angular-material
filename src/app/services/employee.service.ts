import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { StickyDirection } from '@angular/cdk/table';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient, private _snackBar:MatSnackBar) { 
  }
  addEmployee(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/employees', data);
  }
  getEmployee():Observable<any>{
    return this._http.get('http://localhost:3000/employees');
  }
  deleteEmployee(id: number): Observable<any>{
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }
  updateEmployee(id: number, data:any): Observable<any>{
    return this._http.put(`http://localhost:3000/employees/${id}`, data)
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
