import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  // isAuthenticated: Observable<boolean>;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    // this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['admin', 'login']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
