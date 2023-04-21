import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorRegister } from 'src/app/models/Author/AuthorRegister';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authorService: AuthorService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    const formData = this.registerForm.value;
    const request = new AuthorRegister();
    request.name = formData.name;
    request.email = formData.email;
    request.password = formData.password;

    this.authorService.register(request).subscribe(r => {
      this.router.navigate(['/login']);
    })
  }
}
