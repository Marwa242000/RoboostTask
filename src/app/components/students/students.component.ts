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
  

  constructor(
    private _StudentsService: StudentsService,
    private _Router: Router
  ) {
    
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

  
  

 
}
