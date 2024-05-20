import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
  ],
  providers: [AuthService],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private __translateService: TranslateService
  ) {
    const lang = localStorage.getItem('language') || 'en';
    this.__translateService.setDefaultLang(lang);
    this.__translateService.use(lang);
  }

  isLoading: boolean = false;
  errorMessage: string = '';

  loginForm: FormGroup = new FormGroup({
    UserName: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^[a-zA-Z0-9!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",.<>/?\\|`~]+$/
      ),
    ]),
    Password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^[a-zA-Z0-9!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",.<>/?\\|`~]+$/
      ),
    ]),
  });

  handleForm(): void {
    const userData = this.loginForm.value;
    this.isLoading = true;

    if (this.loginForm.valid) {
      this._AuthService.login(userData).subscribe({
        next: (response) => {
          //console.log(response); // Ensure console logging
          if (response.Message === '') {
            localStorage.setItem('SToken', response.Data);
            //     this._AuthService.decodedUser();
            this._Router.navigate(['/home']);
          } else {
            this.errorMessage = response?.Message;
            // this.errorMessage = 'This UserName Already Registered';
          }
          this.isLoading = false;
        },
      });
    }
  }
}
