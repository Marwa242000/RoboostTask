import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../core/service/language.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar-auth',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './navbar-auth.component.html',
  styleUrl: './navbar-auth.component.css',
})
export class NavbarAuthComponent implements OnInit {
  selectedLanguage: string = '';

  constructor(
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
}
