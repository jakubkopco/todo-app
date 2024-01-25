import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive()
export class Subscriber implements OnDestroy {
  public subs: Subscription[] = [];

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
