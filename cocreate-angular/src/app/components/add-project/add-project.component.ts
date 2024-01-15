import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectsService } from 'src/app/modules/project/services/projects.service';
import { Project } from 'src/app/modules/project/interfaces/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  Categories: any = ['Full stack', 'Grafical design', 'Front end', 'Back end']
  addProjectForum = new FormGroup({
    projectName: new FormControl(),
    author: new FormControl({value: "", disabled: true}),
    price: new FormControl(),
    category: new FormControl(),
    numberOfPArticipants: new FormControl(),
    expirience: new FormControl(),
    description: new FormControl(),
    profilePicture: new FormControl(),
  });

  constructor(private projectsService: ProjectsService, private router: Router) {}

  submit() {
    
  }

  addProject() {
    if (this.addProjectForum.valid) {
      this.projectsService.addProject(this.addProjectForum.value as Project).subscribe({
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

  discardProject() {

  }
}
