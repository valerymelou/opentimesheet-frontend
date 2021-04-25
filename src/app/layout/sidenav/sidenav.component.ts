import { Component, Input, OnInit } from '@angular/core';
import { Route } from './route';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() collapsed = false;

  routes: Route[] = [
    {
      path: 'time-track/fill',
      icon: 'timelapse',
      label: 'Time-Track'
    },
    {
      path: 'tasks',
      icon: 'task',
      label: 'Tasks & projects'
    },
    {
      path: 'reports',
      icon: 'analytics',
      label: 'Reports'
    },
    {
      path: 'users',
      icon: 'group',
      label: 'Users'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
