import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WishesService } from '../wishes/wishes.service';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Wish } from '../wishes/wish';
import { Category } from '../wishes-category/category';

@Component({
  selector: 'app-wish-input',
  templateUrl: './wish-input.component.html',
  styleUrls: ['./wish-input.component.scss']
})
export class WishInputComponent implements OnInit {
  wishForm = this.fb.group({
    text: ['', Validators.required],
    category: ['', Validators.required],
  });  
  
  panelOpenState: boolean;
  
  constructor(private wishesService: WishesService, private fb: FormBuilder) { }

  ngOnInit() {
  }
  
  onSubmit() {
    if (this.wishForm.invalid) {
      return;
    }
    this.addWish(this.wishForm.value);
    this.wishForm.reset();
  }
  
  addWish(wishArr) {
    
    if(!wishArr){return;}
   
    this.wishesService.addWish(wishArr).subscribe(newWish => {
      
      this.wishesService.wishes.push(newWish);
      
      this.wishesService.categories = this.wishesService.getCategories(this.wishesService.wishes);
    });
  };

}
