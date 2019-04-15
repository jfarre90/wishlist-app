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
  
  deleteWish(wish: Wish): void {
    
    this.category.wishes = this.category.wishes.filter(dWish => dWish !== wish);
    this.wishesService.wishes = this.wishesService.wishes.filter(dWish => dWish !== wish);

    this.wishesService.deleteWish(wish).subscribe(); 
  }

}
