import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { LanguageService } from '../../../core/service/language.service';
@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FooterComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.css'],
})
export class NavbarBlankComponent implements OnInit {
  selectedLanguage: string = '';

  constructor(
    private _Router: Router,
    private translateService: TranslateService,
    private _languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('language') || 'en';
    this._languageService.setLanguage(this.selectedLanguage);
  }

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLang = selectElement.value;
    this.selectedLanguage = selectedLang;

    localStorage.setItem('language', selectedLang);
    this._languageService.setLanguage(selectedLang);

    this.translateService.use(selectedLang);
  }

  signOut(): void {
    localStorage.removeItem('SToken');
    this._Router.navigate(['/login']);
  }
}
