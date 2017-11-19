import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ThemeService {

  constructor() { }

  isDarkTheme() {
    const themeColor = localStorage.getItem(environment.themeColor);
    return themeColor != null && themeColor === 'dark';
  }

  switchTheme(): void {
    const currentTheme = localStorage.getItem(environment.themeColor);
    if (currentTheme === 'dark') {
      localStorage.setItem(environment.themeColor, 'light');
    } else {
      localStorage.setItem(environment.themeColor, 'dark');
    }
  }
}
