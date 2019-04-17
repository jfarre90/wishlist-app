import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appWishCategory]'
})
export class WishCategoryDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
