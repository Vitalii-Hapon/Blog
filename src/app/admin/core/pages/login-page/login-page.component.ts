import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from '../../../../shared/interfaces';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  // login form
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  // variables
  ngUnsubscribe = new Subject();
  submitted: boolean;
  message: string;
  error$: Observable<string>;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.error$ = this.authService.error$;

    this.route.queryParams
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((params: Params) => {
        if (params.loginAgain) {
          this.message = 'Sign in, please';
        } else if (params.authFailed) {
          this.message = 'Session is over. Please enter the data again';
        }
      });
  }

  submit() {
    if (this.form.invalid) {
      return;
    } else {
      const user: User = {
        email: this.form.value.email,
        password: this.form.value.password
      };

      this.submitted = true;

      this.authService.login(user)
        .pipe(
          takeUntil(this.ngUnsubscribe))
        .subscribe(() => {
          this.form.reset();
          this.router.navigate(['/admin', 'dashboard']);
          this.submitted = false;
        }, () => {
          this.submitted = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }
}
