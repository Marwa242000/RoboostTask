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
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
  ],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
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

  registerForm: FormGroup = new FormGroup({
    Name: new FormControl(''),
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
    const userData = this.registerForm.value;
    this.isLoading = true;

    if (this.registerForm.valid) {
      this._AuthService.register(userData).subscribe({
        next: (response) => {
          //console.log(response); // Ensure console logging
          if (response.Message === 'تم الاضافة بنجاح') {
            this._Router.navigate(['/login']);
          } else {
            //this.errorMessage = response?.Message;
            this.errorMessage = 'This UserName Already Registered';
          }
          this.isLoading = false;
        },
      });
    }
  }
}
