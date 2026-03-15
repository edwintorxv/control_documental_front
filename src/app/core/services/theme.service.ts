import { Injectable } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    constructor(private primeng: PrimeNG) { }

    setTheme(mode: 'light' | 'dark') {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        localStorage.setItem('app-theme', mode);
    }

    loadTheme() {
        const saved = (localStorage.getItem('app-theme') as 'light' | 'dark') || 'light';
        this.setTheme(saved);
    }
}
