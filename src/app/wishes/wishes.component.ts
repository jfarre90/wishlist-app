import { Component, OnInit} from '@angular/core';
import { WishesService } from './wishes.service';

import { Wish } from './wish';


@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.scss']
})
export class WishesComponent implements OnInit {
  
  constructor(private wishesService: WishesService) { }
  
  
  //Initializing
  ngOnInit() {
    
  }
  
  
  getWishes(){
    this.wishesService.getWishes().subscribe(wishes => {
      this.wishesService.wishes = wishes
      this.wishesService.categories = this.wishesService.getCategories(this.wishesService.wishes);
      });
  };
}
