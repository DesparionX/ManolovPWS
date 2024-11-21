import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { LoginResponse, LoginUserRequest } from '../../api/models';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {

  }
  @ViewChild('password') pwd!: ElementRef<HTMLInputElement>;
  @ViewChild('error') msg!: ElementRef<HTMLLabelElement>;


  form = this.fb.nonNullable.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  })

  errorMsg = 'Some error message.';

  ngOnInit() {

  }

  // HTML
  togglePasswordVisibility(showPassword: boolean) {
    this.pwd.nativeElement.type = showPassword ? 'text' : 'password';
  }

  // API //

  // Login.
  async logIn() {

    if (this.form.valid) {
      const request: LoginUserRequest = {
        userName: this.form.value.userName,
        password: this.form.value.password
      }

      const response: LoginResponse = await this.auth.logIn(request);
      if (response.succeed) {
        console.log(response.user?.userName + ' logged in.')
        this.router.navigate(['/control-panel']);
      } else {
        this.errorMsg = response.message!;
        this.msg.nativeElement.hidden = false;
      }
    }
  }
}
