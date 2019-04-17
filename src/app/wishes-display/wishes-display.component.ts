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



export class WishesDisplayComponent implements OnInit, OnDestroy, AfterViewInit{
  
  // @Input () wishes: Wish[];
  // @Output () wishesChange = new EventEmitter<Wish[]>();
    
  // @Input () categories: Category[];
  // @Output () categoriesChange = new EventEmitter<Category[]>();
  
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
  
  
  createCategories(){
    let categoryHostsArray = this.categoryHosts.toArray();

    
    categoryHostsArray.forEach((categoryHost,i) => {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(WishesCategoryComponent);
      let viewContainerRef = categoryHost.viewContainerRef;
      viewContainerRef.clear();
      
      let componentRef = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.category = this.wishesService.categories[i]; 
      componentRef.changeDetectorRef.detectChanges();
    });
  }
  
  clearView(){
    let categoryHostsArray = this.categoryHosts.toArray();
    categoryHostsArray.forEach((categoryHost,i) => {
      let viewContainerRef = categoryHost.viewContainerRef;
      viewContainerRef.clear();
    });
  }
  
  filterCategory(filterCategory: Category){
    console.log(`filter the display to only show ${filterCategory.title}`)
    this.clearView();
    let categoryHostsArray = this.categoryHosts.toArray();
    this.wishesService.categories.forEach(category => {
      if(category === filterCategory){
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(WishesCategoryComponent);
        let viewContainerRef = categoryHostsArray[0].viewContainerRef;
        viewContainerRef.clear();
        
        let componentRef = viewContainerRef.createComponent(componentFactory);
        
        componentRef.instance.category = category; 
        componentRef.changeDetectorRef.detectChanges();
      }
    });
    
  }
  
  showAllCategories(){
    console.log(`remove filters and show all categories`);
    this.createCategories();
  }

}
