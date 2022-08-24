import { Component } from '@angular/core';

interface NavLink {
  href: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'yanosik-auth-site';
  navigationLinks: NavLink[] = [
    { href: '/logowanie', label: 'Zaloguj' },
    { href: '/rejestracja', label: 'Zarejestruj' },
  ];
}
