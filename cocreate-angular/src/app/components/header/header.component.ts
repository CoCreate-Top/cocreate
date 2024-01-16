import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  logout() {
    this.authenticationService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(["login"]);
      },
      error: (err) => { console.log(err) },
    })
  }

  isLoggedIn(): boolean {
    // TODO: hotfix
    if (this.router.url === "/login" || this.router.url === "/register") {
      return false;
    }
    return true;
  }
}
