import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from '../../../core/service/students.service';
import { Student } from '../../../core/interface/student';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterLink,
  ],

  providers: [StudentsService, ToastrService],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  student: Student[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  addStudentForm: FormGroup;

  constructor(
    private _StudentsService: StudentsService,
    private _Router: Router
  ) {
    this.addStudentForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      Age: new FormControl('', [Validators.min(1)]),
      Email: new FormControl('', [Validators.email]),
      Mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+)?\d{6,14}$/),
      ]),
      NationalID: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents(): void {
    this._StudentsService.getStudents().subscribe({
      next: (response) => {
        this.student = response.Data;
        console.log(response);
      },
      error: (err) => {
        this.errorMessage = 'Error fetching student data';
      },
    });
  }

  addNewStudent(): void {
    console.log(this.addStudentForm.value);
    this.isLoading = true;

    if (this.addStudentForm.valid) {
      this._StudentsService.addStudent(this.addStudentForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.Message === 'تم الاضافة بنجاح') {
            this.isLoading = false;
            this.getAllStudents();
            this.addStudentForm.reset();
          } else {
            this.errorMessage = response.Message;
          }
        },
        error: (err) => {
          this.errorMessage = 'Error adding student';
        },
      });
    }
  }
}
