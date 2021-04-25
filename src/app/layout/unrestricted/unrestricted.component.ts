import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrgService } from 'src/app/org/org.service';

@Component({
  selector: 'app-unrestricted',
  templateUrl: './unrestricted.component.html',
})
export class UnrestrictedComponent implements OnInit {

  constructor(private route: ActivatedRoute, private orgService: OrgService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.orgService.setCurrentOrgCode(data.org);
    });
  }
}
