import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SimpleStudent, Student } from '../interface/student';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private _HttpClient: HttpClient) {}
  baseUrl: string = 'https://api.mohamed-sadek.com/Student/';
  getStudents(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'Get');
  }
  addStudent(student: Student): Observable<any> {
    return this._HttpClient.post<any>(this.baseUrl + 'POST', student);
  }
}
