import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrgService } from 'src/app/org/org.service';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.component.html',
  styleUrls: ['./restricted.component.scss']
})
export class RestrictedComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private orgService: OrgService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1023px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.orgService.setCurrentOrgCode(data.org);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
