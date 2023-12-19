import { Component } from '@angular/core';
import getGithubUrl from './services/getGithubUrl'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cocreate';

  constructor() {
  }

  getGithubUrl() {
    return getGithubUrl();
  }
}
