import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appWish]'
})
export class WishDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
