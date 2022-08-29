import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title: string = 'Logowanie';
  labels = {
    login: 'Zaloguj',
    email: 'Email',
    password: 'Hasło',
    errorEmailRequired: 'Podaj adres email',
    errorEmailIncorrect: 'Podaj poprawny adres email',
    errorPasswordRequired: 'Podaj hasło',
    errorPasswordLength: 'Hasło jest za krótkie',
  };

  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    try {
      if (!this.loginForm.valid) {
        throw new Error('Nieprawidłowe dane w formularzu');
      }
      this.authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          window.alert('Wysłano');
        },
        error: (error) => window.alert('Wystąpił błąd'),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
