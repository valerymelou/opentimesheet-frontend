import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrgService } from 'src/app/org/org.service';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.component.html'
})
export class RestrictedComponent implements OnInit {
  sidenavCollapsed = false;

  constructor(private route: ActivatedRoute, private orgService: OrgService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.orgService.setCurrentOrgCode(data.org);
    });
  }

  toggleSidenav(): void {
    this.sidenavCollapsed = !this.sidenavCollapsed;
  }
}
