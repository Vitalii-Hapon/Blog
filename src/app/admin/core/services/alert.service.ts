import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
  type: AlertType;
  text: string;
}

@Injectable()
export class AlertService {
  public Alert$ = new Subject<Alert>();

  constructor() {
  }

  success(text: string) {
    this.Alert$.next({type: 'success', text});
  }

  warning(text: string) {
    this.Alert$.next({type: 'warning', text});
  }

  danger(text: string) {
    this.Alert$.next({type: 'danger', text});
  }
}
