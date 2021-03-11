import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrgService } from '../org.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
  constructor(private route: ActivatedRoute, private orgService: OrgService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.orgService.setCurrentOrgCode(data.org);
    });
  }
}
