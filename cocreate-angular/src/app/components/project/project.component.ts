import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { IProject } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class ProjectComponent implements OnInit {
  Categories: any = ['Full stack', 'Grafical design', 'Front end', 'Back end']
  projectForum = new FormGroup({
    id: new FormControl(),
    projectName: new FormControl(),
    author: new FormControl({value: "", disabled: true}),
    price: new FormControl(),
    category: new FormControl(),
    numberOfPArticipants: new FormControl(),
    expirience: new FormControl(),
    description: new FormControl(),
    profilePicture: new FormControl(),
  });

  constructor(private projectsService: ProjectsService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.getProject(this.route.snapshot.paramMap.get('id') as string)
  }

  getProject(id: string) {
    this.projectsService.getProject(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err)
    });
  }

  editProject() {
    this.projectsService.editProject(this.projectForum.value.id, this.projectForum.value as IProject).subscribe({
      next: (res) => {
        this.projectForum.controls["id"].setValue(res.id);
        this.projectForum.controls["description"].setValue(res.description);
        this.projectForum.controls["projectName"].setValue(res.title);
        console.log(res);
      },
      error: (err) => console.log(err)
    });
  }

}
