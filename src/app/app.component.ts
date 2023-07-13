import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
  'id', 
  'firstName', 
  'lastName', 
  'email', 
  'dob', 
  'gender',
  'education', 
  'company', 
  'experience', 
  'package',
  'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _dialog: MatDialog, 
    private _empService: EmployeeService,
    private _snackBar: MatSnackBar
    ){
  }
  ngOnInit(): void {
    this.getEmployeeList();
  }
  openAddEditComponent(){
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          console.log('dialog closed');
          this.getEmployeeList();
        }
      }
    })

  }
  getEmployeeList(){
    this._empService.getEmployee().subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEmployeeDelete(id: number){
    this._empService.deleteEmployee(id).subscribe({
      next: (res)=>{
        this._empService.openSnackBar('Employee Deleted', '');  
        this.getEmployeeList();
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  onEditForm(data:any){
    console.log(data);
    const dialogRef = this._dialog.open(EmpAddEditComponent,{
      data: data
    });
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          console.log('dialog closed');
          this.getEmployeeList();
        }
      }
    })
  }
  
}