import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: ApiService) {

  }
  @ViewChild('password') pwd!: ElementRef<HTMLInputElement>;

  form = this.fb.nonNullable.group({

  })

  ngOnInit() {

  }

  // HTML
  togglePasswordVisibility(showPassword: boolean) {
    this.pwd.nativeElement.type = showPassword ? 'text' : 'password';
  }
}
