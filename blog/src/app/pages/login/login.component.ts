import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorLogin } from 'src/app/models/Author/AuthorLogin';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public storage;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) { this.storage = localStorage }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;
    const request = new AuthorLogin();
    request.email = formData.email;
    request.password = formData.password;

    this.authService.login(request);
  }
}
