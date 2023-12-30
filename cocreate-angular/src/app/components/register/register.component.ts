import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    rpassword: new FormControl(''),
  });

  constructor(private authenticationService: AuthenticationService) {

  }

  register(username: string, email: string, password: string) {
    this.authenticationService.register(username, email, password).subscribe({
      next: (res) => {

      },
      error: (err) => console.log(err)
    });
  }
}
