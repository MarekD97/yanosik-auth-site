import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

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
  registerButtonLabel: string = 'Zarejestruj';
  emailLabel: string = 'Email';
  passwordLabel: string = 'Hasło';
  confirmPasswordLabel: string = 'Powtórz hasło';
  checkedAll: boolean = false;

  registerForm: FormGroup;

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

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', Validators.required),
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
    for (let rule of this.ruleList) {
      rule.checked = newValue;
    }
  }

  checkOne(event: any) {
    const newValue = event.target.checked;
    if (!newValue) this.checkedAll = false;
    const index = this.ruleList.findIndex(
      (rule: CheckboxItem) => rule.name === event.target.getAttribute('name')
    );
    this.ruleList[index].checked = newValue;
  }

  register(form: FormGroup) {
    try {
      if (!form.valid) {
        throw new Error('Nieprawidłowe dane w formularzu');
      }
    } catch (error) {}
  }
}
