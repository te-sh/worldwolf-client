import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective {

  @Output() appLongPress = new EventEmitter<any>();

  private duration = 2000;

  private pressing: boolean;
  private subscription: Subscription;

  constructor() {
    this.pressing = false;
  }

  @HostListener('mousedown', ['$event'])
  mouseDown(event: any) {
    if (event.which > 1) {
      return;
    }

    this.onDown();
  }

  @HostListener('mouseup', ['$event'])
  mouseUp(event: any) {
    if (event.which > 1) {
      return;
    }

    this.onUp();
  }

  @HostListener('touchstart', ['$event'])
  touchStart(event: any) {
    this.onDown();
  }

  @HostListener('touchend', ['$event'])
  touchEnd(event: any) {
    this.onUp();
  }

  onDown() {
    this.subscription = timer(this.duration)
      .subscribe(() => this.appLongPress.emit());
  }

  onUp() {
    this.subscription.unsubscribe();
  }

}
