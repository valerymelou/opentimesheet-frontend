import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private i18n: TranslateService, private auth: AuthService) {
    i18n.setDefaultLang('en');
    i18n.use('en');
  }

  ngOnInit(): void {
    this.auth.initSession();
  }
}
