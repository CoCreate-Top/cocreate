import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '',
    redirectTo: '/app-login',
    pathMatch: 'full'
  },
  // { path: 'register', component: RegisterComponent },
  {
    path: 'projects',
    loadChildren: () =>
      import('./modules/project/projects.module').then(m => m.ProjectsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
