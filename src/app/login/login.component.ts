import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title: string = 'Logowanie';
  loginButtonLabel: string = 'Zaloguj';
  emailLabel: string = 'Email';
  passwordLabel: string = 'Hasło';

  constructor() {}

  ngOnInit(): void {}
}
