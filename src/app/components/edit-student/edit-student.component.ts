import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentsService } from '../../../core/service/students.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SimpleStudent, Student } from '../../../core/interface/student';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
  ],
  providers: [StudentsService],
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  editStudentForm: FormGroup;
  studentId: number | null = null;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _studentsService: StudentsService,
    private __translateService: TranslateService
  ) {
    this.editStudentForm = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      Age: new FormControl('', Validators.min(1)),
      Email: new FormControl('', Validators.email),
      Mobile: new FormControl(
        '',

        Validators.pattern(/^(\+)?\d{6,14}$/)
      ),
      NationalID: new FormControl(''),
    });
    const lang = localStorage.getItem('language') || 'en';
    this.__translateService.setDefaultLang(lang);
    this.__translateService.use(lang);
  }

  ngOnInit(): void {
    // Accessing the route parameter using params observable
    this.route.params.subscribe((params) => {
      this.studentId = Number(params['id']);
      if (this.studentId) {
        this.loadStudentData(this.studentId);
      }
    });
  }

  loadStudentData(id: number): void {
    this._studentsService.getStudentById(id).subscribe((data: any) => {
      if (data && data.Data) {
        const studentData = data.Data;

        // Split the Name into FirstName and LastName
        const nameParts = studentData.Name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' '); // Handles cases where the last name might have multiple parts

        this.studentId = studentData.ID;
        this.editStudentForm.patchValue({
          FirstName: firstName,
          LastName: lastName,
          Age: studentData.Age,
          Email: studentData.Email,
          Mobile: studentData.Mobile,
          NationalID: studentData.NationalID,
        });
      } else {
        console.error('No student data found for id', id);
      }
    });
  }

  updateStudent(): void {
    if (this.editStudentForm.valid && this.studentId !== null) {
      this.isLoading = true;
      const updatedStudent: SimpleStudent = {
        ID: this.studentId,
        FirstName: this.editStudentForm.get('FirstName')?.value,
        LastName: this.editStudentForm.get('LastName')?.value,
        Age: this.editStudentForm.get('Age')?.value,
        Email: this.editStudentForm.get('Email')?.value,
        Mobile: this.editStudentForm.get('Mobile')?.value,
        NationalID: this.editStudentForm.get('NationalID')?.value,
        NameArabic: 'Arabic Name',
        NameEnglish: 'English Name',
      };

      console.log(updatedStudent);

      this._studentsService.updateStudent(updatedStudent).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
          this.router.navigate(['/students']);
        },
        error: (err) => {
          console.log('error');
        },
      });
    }
  }
}
