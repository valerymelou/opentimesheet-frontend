import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { HttpError } from 'src/app/core/http/http-error';
import { AuthService } from '../auth.service';
import { Credentials } from '../credentials';
import { Token } from '../token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: Credentials = new Credentials();
  errors: HttpError[] = [];
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.credentials.email && this.credentials.password) {
      this.loading = true;
      this.auth.authenticate(this.credentials)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((token: Token) => {
        this.auth.login(token);
        this.router.navigate(['time-track/fill'], {relativeTo: this.route.parent});
      }, errors => {
        this.errors = errors;
      }, () => {
      });
    }
  }
}
