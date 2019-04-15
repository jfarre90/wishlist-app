import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { WishesService } from '../wishes/wishes.service';

import { Wish } from '../wishes/wish';
import { Category } from './category';

@Component({
  selector: 'app-wishes-category',
  templateUrl: './wishes-category.component.html',
  styleUrls: ['./wishes-category.component.scss']
})
export class WishesCategoryComponent implements OnInit {
 
  
  @Input () category;
  
  constructor(private wishesService: WishesService) { }

  ngOnInit() {
  }
  
  deleteCategory(categoryToDelete: string): void {
    //I am modifying the category to allow for a valid URL by changing spaces to underscore and making everything lowercase
    const categoryToHtml = categoryToDelete.replace(/ /g, "_").toLowerCase();
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
  
  updateWishCategory(event: CdkDragDrop<string[]>) {
      
  }
}
