import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrls:[ './add-project.component.scss']
})
export class AddProjectComponent {
  Categories: any = ['Full stack', 'Grafical design', 'Front end', 'Back end']
  addProjectForum = new FormGroup({
    projectName: new FormControl(),
    author: new FormControl({value:'Ambrož Klančar', disabled: true}),
    price: new FormControl(),
    category: new FormControl(),
    numberOfPArticipants: new FormControl(),
    expirience: new FormControl(),
    description: new FormControl(),
    profilePicture: new FormControl(),
  });

  submit(){
    console.log(this.addProjectForum.value.projectName)
    console.log(this.addProjectForum.getRawValue().author)
    console.log(this.addProjectForum.value.price)
    console.log(this.addProjectForum.value.category)
    console.log(this.addProjectForum.value.numberOfPArticipants)
    console.log(this.addProjectForum.value.expirience)
    console.log(this.addProjectForum.value.description)
    console.log(this.addProjectForum.value.profilePicture)
  }
}
