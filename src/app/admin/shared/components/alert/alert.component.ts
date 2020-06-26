import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {AlertService} from '../../../core/services/alert.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() delay = 5000;

  // variables
  ngUnsubscribe = new Subject();
  public text: string;
  public type = 'success';

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertService.Alert$
      .pipe(
        takeUntil(this.ngUnsubscribe))
      .subscribe(alert => {
        this.text = alert.text;
        this.type = alert.type;

        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          this.text = '';
        }, this.delay);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

}
