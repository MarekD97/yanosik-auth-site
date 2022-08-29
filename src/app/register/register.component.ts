import { Component, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { catchError } from 'rxjs';
import { AuthService } from '../service/auth.service';

interface CheckboxItem {
  name: string;
  label: string;
  required: boolean;
  checked: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  title: string = 'Rejestracja';
  labels = {
    registerButton: 'Zarejestruj',
    email: 'Email',
    password: 'Hasło',
    confirmPassword: 'Powtórz hasło',
    acceptAllRules: 'Akceptuję wszystkie zgody',
    errorEmailRequired: 'Podaj adres email',
    errorEmailIncorrect: 'Podaj poprawny adres email',
    errorPasswordRequired: 'Podaj hasło',
    errorPasswordLength:
      'Hasło jest za krótkie, powinno zawierać min. 6 znaków',
    errorConfirmPassword: 'Hasło niepoprawne',
    errorRules: 'Zaznacz wszystkie wymagane pola',
  };

  checkedAll: boolean = false;

  registerForm: FormGroup;
  submitted: boolean = false;

  ruleList: CheckboxItem[] = [
    {
      name: 'regulations',
      label: 'Zapoznałem/am się z Regulaminem',
      required: true,
      checked: false,
    },
    {
      name: 'privacyPolicy',
      label: 'Zapoznałem/am się z Polityką Prywatności',
      required: true,
      checked: false,
    },
    {
      name: 'marketingPurposes',
      label:
        'Wyrażam zgodę na przetwarzanie moich danych w celach marketingowych',
      required: false,
      checked: false,
    },
  ];

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', Validators.required),
        regulations: new FormControl(
          this.ruleList[0].checked,
          Validators.requiredTrue
        ),
        privacyPolicy: new FormControl(
          this.ruleList[1].checked,
          Validators.requiredTrue
        ),
        marketingPurposes: new FormControl(this.ruleList[2].checked),
      },
      { validators: this.passwordMatchingValidatior }
    );
  }

  ngOnInit(): void {}

  passwordMatchingValidatior: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password?.value === confirmPassword?.value
      ? null
      : { notmatched: true };
  };

  checkAll(event: any) {
    const newValue = event.target.checked;
    this.checkedAll = newValue;
    for (let i = 0; i < this.ruleList.length; i++) {
      this.ruleList[i].checked = newValue;
    }
    this.registerForm.get('regulations')?.setValue(newValue);
    this.registerForm.get('privacyPolicy')?.setValue(newValue);
    this.registerForm.get('marketingPurposes')?.setValue(newValue);
  }

  checkOne(event: any) {
    const newValue = event.target.checked;
    if (!newValue) this.checkedAll = false;
    const index = this.ruleList.findIndex(
      (rule: CheckboxItem) => rule.name === event.target.getAttribute('name')
    );
    this.ruleList[index].checked = newValue;
  }

  allRequiredRulesChecked() {
    this.ruleList.every((rule) => {
      if (rule.required) {
        return rule.checked;
      }
      return true;
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm);
    try {
      if (!this.registerForm.valid) {
        throw new Error('Nieprawidłowe dane w formularzu');
      }
      this.authService.register(this.registerForm.value).subscribe({
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
