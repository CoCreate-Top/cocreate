import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    userName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    rpassword: new FormControl(),
  });

  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }

  register() {
    this.authenticationService.register(this.registerForm.getRawValue().userName, this.registerForm.getRawValue().email, this.registerForm.getRawValue().password).subscribe({
      next: (res) => {
        // TODO: toastr uspešne registracije
        this.router.navigateByUrl("/login");
      },
      error: (err) => console.log(err)
    });
  }
}
