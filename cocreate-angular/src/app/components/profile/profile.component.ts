import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    expirience: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
    location: new FormControl(),
    socialMediaLinks: new FormControl(),
  });

  submit(){
    console.log(this.profileForm.value.firstname)
    console.log(this.profileForm.value.lastname)
    console.log(this.profileForm.value.expirience)
    console.log(this.profileForm.value.phone)
    console.log(this.profileForm.value.email)
    console.log(this.profileForm.value.location)
    console.log(this.profileForm.value.socialMediaLinks)
  }
}
