import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authenticationService: AuthenticationService) {

  }

  login(username: string, password: string) {
  }

  loginGoogle() {
  }

  register(firstName: string, lastName: string, email: string, password: string) {
  }

}
