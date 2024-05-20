import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('en');
  public currentLanguage$ = this.languageSubject.asObservable();

  private rtlLanguages = ['ar'];

  setLanguage(language: string) {
    this.languageSubject.next(language);
    this.updateDirection(language);
  }

  private updateDirection(language: string) {
    const isRtl = this.rtlLanguages.includes(language);
    const dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
  }
}
