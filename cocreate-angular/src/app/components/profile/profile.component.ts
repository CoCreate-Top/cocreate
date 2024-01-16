import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
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

  constructor (private profileService: ProfileService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getProfile().subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    });
  }

  editProfile() {
    /* this.profileService.editProfile(id, this.profileForm.value).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    }); */
  }
}
