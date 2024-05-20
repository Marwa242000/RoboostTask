import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.css',
})
export class NavbarBlankComponent {
  lang: string = '';

  constructor(private _Router: Router) {}

  signOut(): void {
    localStorage.removeItem('SToken');
    this._Router.navigate(['/login']);
  }
}
