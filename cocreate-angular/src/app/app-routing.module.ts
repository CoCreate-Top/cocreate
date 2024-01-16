import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectsComponent } from './components/projects/projects.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'add-project', component: AddProjectComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent, pathMatch: 'full' },
  { path: 'project', component: ProjectsComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
