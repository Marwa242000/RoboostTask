import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}
  userInfo: any;
  baseUrl: string = `https://api.mohamed-sadek.com/User/`;
  register(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'POST', userData);
  }
  login(userData: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'Login', userData);
  }
  // decodedUser(): void {
  //   const encode = localStorage.getItem('SToken');
  //   if (encode !== null) {
  //     const decode = jwtDecode(encode);
  //     this.userInfo = decode;
  //     console.log(decode);
  //   }
}
