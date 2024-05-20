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
  searchText: string = '';
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

  search(): void {
    if (!this.searchText) {
      this.getAllStudents();
      return;
    }
    this.student = this.student.filter((student) =>
      this.matchesSearchCriteria(student)
    );
  }

  matchesSearchCriteria(student: Student): boolean {
    const searchTextLower = this.searchText.toLowerCase();
    return (
      student.Name.toLowerCase().includes(searchTextLower) ||
      (student.Mobile && student.Mobile.toString().includes(searchTextLower)) ||
      (student.NationalID &&
        student.NationalID.toString().includes(searchTextLower)) ||
      (student.Age !== null &&
        student.Age !== undefined &&
        student.Age.toString().includes(searchTextLower))
    );
  }

  onSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchText = inputElement.value;
    this.search();
  }
}
