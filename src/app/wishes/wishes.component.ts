import { Component, OnInit} from '@angular/core';
import { WishesService } from './wishes.service';

import { Wish } from './wish';


@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.component.html',
  styleUrls: ['./wishes.component.scss']
})
export class WishesComponent implements OnInit {
  
  constructor(public wishesService: WishesService) { }
  
  
  
  ngOnInit() {
    
  }
}
