import { Component, Input, OnInit } from '@angular/core';
import { Route } from './route';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  routes: Route[] = [
    {
      path: 'time-track/fill',
      icon: 'timelapse',
      label: 'LINK.TIME-TRACK',
    },
    {
      path: 'tasks',
      icon: 'task',
      label: 'LINK.TASKS',
    },
    {
      path: 'reports',
      icon: 'analytics',
      label: 'LINK.REPORTS',
    },
    {
      path: 'users',
      icon: 'group',
      label: 'LINK.USERS',
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}
