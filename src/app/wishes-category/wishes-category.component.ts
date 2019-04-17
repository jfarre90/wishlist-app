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

import {WishComponent} from '../wish/wish.component';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { WishesService } from '../wishes/wishes.service';

import { WishDirective } from '../wish/wish.directive';

import { Wish } from '../wishes/wish';
import { Category } from './category';

@Component({
  selector: 'app-wishes-category',
  templateUrl: './wishes-category.component.html',
  styleUrls: ['./wishes-category.component.scss']
})
export class WishesCategoryComponent implements OnInit, OnDestroy, AfterViewInit {
 
  
  @ViewChildren(WishDirective) wishHosts;
  
  constructor(public wishesService: WishesService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.createWishes();
  }
  
  deleteCategory(categoryToDelete: string): void {
    //I am modifying the category to allow for a valid URL by changing spaces to underscore and making everything lowercase
    const categoryToHtml = categoryToDelete.replace(/ /g, "_").toLowerCase();
    
    
    this.wishesService.wishes = this.wishesService.wishes.filter(wish=> wish.category !== categoryToDelete);
    this.wishesService.categories = this.wishesService.categories.filter(category => category.title !== categoryToDelete);
    this.wishesService.deleteCategory(categoryToHtml).subscribe();
  }
  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      
    }
  }
  
  ngOnDestroy() {
    let wishHostsArray = this.wishHosts.toArray();
    wishHostsArray.forEach(wishHost => {
      let viewContainerRef = wishHost.viewContainerRef;
      viewContainerRef.clear();
    });
  }
  
  //Creating wishes dynamically
  createWishes() {
    // let wishHostsArray = this.wishHosts.toArray();
  
    // wishHostsArray.forEach((wishHost, i) => {
    //   console.log(wishHost);
    //   let componentFactory = this.componentFactoryResolver.resolveComponentFactory(WishComponent);
    //   let viewContainerRef = wishHost.viewContainerRef;
    //   viewContainerRef.clear();
      
    //   let componentRef = viewContainerRef.createComponent(componentFactory)
    //   console.log(componentRef)
    //   // componentRef.instance.wish = this.wishesService.wishes[i]; 
    //   // componentRef.changeDetectorRef.detectChanges();
    // }); 
   
  }
};
