import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WishesService } from '../wishes/wishes.service';

import { Wish } from '../wishes/wish';
import { Category } from '../wishes-category/category';

@Component({
  selector: 'app-wishes-display',
  templateUrl: './wishes-display.component.html',
  styleUrls: ['./wishes-display.component.scss']
})
export class WishesDisplayComponent implements OnInit {
  @Input () wishes: Wish[];
  @Output () wishesChange = new EventEmitter<Wish[]>();
    
  @Input () categories: Category[];
  @Output () categoriesChange = new EventEmitter<Category[]>();
  
  constructor(private wishesService: WishesService) { }

  ngOnInit() {
  }

}
