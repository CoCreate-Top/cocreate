import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
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
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
  }

  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }

  login(email: string, password: string) {
    this.authenticationService.loginUsername(email, password).subscribe({
      next: (res) => {
        console.log(res);
        // TODO: toastr za success
        this.router.navigateByUrl("");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loginGoogle() {
  }
}
