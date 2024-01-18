import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IProfile } from 'src/app/interfaces/profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    id: new FormControl(),
    firstname: new FormControl(),
    lastname: new FormControl(),
    expirience: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
    location: new FormControl(),
    socialMediaLinks: new FormControl(),
  });

  constructor(private profileService: ProfileService, private router: Router) {
  }

  ngOnInit() {
    sessionStorage
    this.getProfile();
  }

  submit(){
  }

  getProfile() {
    this.profileService.getProfile().subscribe({
      next: (profile) => this.profileForm.setValue(profile),
      error: (err) => console.log(err)
    });
  }

  editProfile() {
    if (this.profileForm.valid) {
      this.profileService.editProfile(this.profileForm.value.id, this.profileForm.value as IProfile).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl("projects");
        },
        error: (err) => console.log(err)
      });
    } else {
      console.log("Invalid form!");
      
    }
  }
}
