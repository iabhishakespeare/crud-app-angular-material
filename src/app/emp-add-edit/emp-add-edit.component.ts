import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit{
  education: string[]=[
    'Metric',
    'Intermediate',
    'Graduation',
    'Post-Graduation'
  ];
  empForm: FormGroup;
  constructor(
    private _fb: FormBuilder, 
    private _empService: EmployeeService, 
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    });
  }
  onUserSubmit(){
    if(this.data){
      this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
        next: (val: any)=>{
          console.log(this.empForm)
          this._empService.openSnackBar('Employee details updated', '')
          this._dialogRef.close(true);
        },
        error: (err: any)=>{
          alert('Error occured');
        }
      })
    }
    else{
    this._empService.addEmployee(this.empForm.value).subscribe({
      next: (val: any)=>{
        // console.log(this.empForm)
        this._empService.openSnackBar('new employee added','');
        this._dialogRef.close(true);
      },
      error: (err: any)=>{
        alert('Error occured');
      }
    })
  }
  }
  onCancel(){
    this._dialogRef.close(true);
  }
  ngOnInit(){
    this.empForm.patchValue(this.data);
  }

}
