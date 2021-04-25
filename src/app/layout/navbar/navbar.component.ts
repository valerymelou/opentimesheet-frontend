import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() collapse = new EventEmitter();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.collapse.emit();
  }

  logout(): void {
    this.auth.logout();
  }
}
