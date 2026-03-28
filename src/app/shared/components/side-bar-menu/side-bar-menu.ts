import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/routes/reactive.routes';
import { RouterLink, RouterLinkActive } from "@angular/router";

interface IMenuItem {
  title: string;
  route: string;
}

const reactiveItems = reactiveRoutes[0].children ?? []

@Component({
  selector: 'side-bar-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar-menu.html',
})
export class SideBarMenu {

  reactiveMenu: IMenuItem[] = reactiveItems
  .filter(i => i.path !== '**')
  .map(i => ({
    route: `reactive/${i.path}`,
    title: `${i.title}`
  }))

  authMenu: IMenuItem[] = [
    {
      route: 'auth',
      title: 'Sign up'
    }
  ]

  countryMenu: IMenuItem[] = [
    {
      route: 'country',
      title: 'Country'
    }
  ]
}
