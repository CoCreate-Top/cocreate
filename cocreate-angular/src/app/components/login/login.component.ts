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

  login(username: string, password: string) {
    this.authenticationService.loginUsername(username, password).subscribe(res => {
      switch (res.status) {
        case HttpStatusCode.Created:
          // this.toastrService.success();
          this.router.navigate(["projects"]);
          // tukaj spiši akcije, ki se naredijo ob uspešnem loginu (toastr in redirect na '/projects')
          break;
        case HttpStatusCode.BadRequest:
          // error 401
          break;
        case HttpStatusCode.InternalServerError:
          // error 500, izpiši v konzolo, toaster
          break;
      
        default:
          // neznana napaka, izpiši v konzolo in obvesti uporabnika
          break;
      }
    });
  }

  loginGoogle() {
  }

  register(firstName: string, lastName: string, email: string, username: string, password: string) {
    this.authenticationService.register(username, email, password).subscribe(res => {
      switch (res.status) {
        case HttpStatusCode.Created:
          // this.toastrService.success();
          this.router.navigate(["login"]);
          // tukaj spiši akcije, ki se naredijo ob uspešnem loginu (toastr in redirect na '/projects')
          break;
        case HttpStatusCode.BadRequest:
          // error 401
          break;
        case HttpStatusCode.InternalServerError:
          // error 500, izpiši v konzolo, toaster
          break;
      
        default:
          // neznana napaka, izpiši v konzolo in obvesti uporabnika
          break;
      }
    });
  }
}
