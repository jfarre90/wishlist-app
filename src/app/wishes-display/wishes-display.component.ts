import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory

} from '@angular/core';
import { WishesService } from '../wishes/wishes.service';

import { WishCategoryDirective } from '../wishes-category/wish-category.directive';
import { WishesCategoryComponent } from '../wishes-category/wishes-category.component';

import { Wish } from '../wishes/wish';
import { Category } from '../wishes-category/category';

@Component({
  selector: 'app-wishes-display',
  templateUrl: './wishes-display.component.html',
  styleUrls: ['./wishes-display.component.scss']
})



export class WishesDisplayComponent implements OnInit, OnDestroy, AfterViewInit {

   @ViewChildren(WishCategoryDirective) categoryHosts;
   

  constructor(public wishesService: WishesService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createCategories();
  }

  ngOnDestroy() {
    this.clearView();
  }


  createCategories() {
    
    this.clearView();
    
    const categoryHostsArray = this.categoryHosts.toArray();

    categoryHostsArray.forEach((categoryHost, i) => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(WishesCategoryComponent);
      const viewContainerRef = categoryHost.viewContainerRef;

      const componentRef = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.category = this.wishesService.categories[i];
      componentRef.changeDetectorRef.detectChanges();
    });
  }
  
  clearView() {
    const categoryHostsArray = this.categoryHosts.toArray();
    
    categoryHostsArray.forEach((categoryHost, i) => {
      const viewContainerRef = categoryHost.viewContainerRef;
      viewContainerRef.clear();
    });
  }
  
  filterCategory(filterCategory: Category) {
    this.clearView();
    const categoryHostsArray = this.categoryHosts.toArray();
    this.wishesService.categories.forEach((category, i) => {
      if (category === filterCategory) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(WishesCategoryComponent);
        const viewContainerRef = categoryHostsArray[i].viewContainerRef;
        viewContainerRef.clear();
        
        const componentRef = viewContainerRef.createComponent(componentFactory);
        
        componentRef.instance.category = category;
        componentRef.changeDetectorRef.detectChanges();
      }
    });
    
  }
  
  showAllCategories() {
    this.createCategories();
  }

}
