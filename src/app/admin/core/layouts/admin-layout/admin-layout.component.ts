import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.alertService.warning('You`ve sign out');
    this.router.navigate(['admin', 'login']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
