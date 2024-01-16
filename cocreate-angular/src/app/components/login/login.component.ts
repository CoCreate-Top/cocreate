import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
  }

  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }

  login() {
    this.authenticationService.loginUsername(this.loginForm.getRawValue().email, this.loginForm.getRawValue().password).subscribe({
      next: (res) => {
        console.log("🚀 ~ LoginComponent ~ this.authenticationService.loginUsername ~ res:", res)
        // TODO: toastr za success
        this.router.navigateByUrl("projects");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loginGoogle() {
  }
}
