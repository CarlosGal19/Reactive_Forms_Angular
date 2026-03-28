import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarMenu } from './shared/components/side-bar-menu/side-bar-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideBarMenu],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Reactive_Forms_Angular');
}
