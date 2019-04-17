import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {WishesService} from '../wishes/wishes.service';


import { Wish } from '../wishes/wish';
import { Category } from '../wishes-category/category';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.scss']
})
export class WishComponent implements OnInit {
  @Input () category: Category;
  
  @Input () wish: Wish;

  constructor(private wishesService: WishesService) { }

  ngOnInit() {
  }
  
  deleteWish(wishToDelete: Wish): void {
    
    //update categories array
    this.wishesService.categories.forEach( category => {
      if(category.wishes.includes(wishToDelete)) {
        category.wishes = category.wishes.filter(wish => wish !== wishToDelete);
      }
    });
    
    //update wishes array
    this.wishesService.wishes = this.wishesService.wishes.filter(wish => wish !== wishToDelete);
    
    //update database
    this.wishesService.deleteWish(wishToDelete).subscribe();
  }

}
