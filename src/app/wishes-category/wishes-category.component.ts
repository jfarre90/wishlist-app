import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';

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
  
  category: Category;
  
  constructor(private wishesService: WishesService) { }

  ngOnInit() {
  }

  deleteCategory(categoryToDelete: string): void {
    // categoryToHtml will be used for the API call
    const categoryToHtml = categoryToDelete.replace(/ /g, '_').toLowerCase();
    
    this.wishesService.wishes = this.wishesService.wishes.filter(wish => wish.category !== categoryToDelete);
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
}
