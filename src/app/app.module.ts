import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { WishesService } from './wishes/wishes.service';


// Material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatIconModule,
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatListModule
} from '@angular/material';

import {FlexLayoutModule} from '@angular/flex-layout';
import {DragDropModule} from '@angular/cdk/drag-drop';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AboutComponent } from './about/about.component';
import { WishComponent } from './wish/wish.component';
import { WishesComponent } from './wishes/wishes.component';
import { WishInputComponent } from './wish-input/wish-input.component';
import { WishesDisplayComponent } from './wishes-display/wishes-display.component';
import { WishesCategoryComponent } from './wishes-category/wishes-category.component';
import { WishCategoryDirective } from './wishes-category/wish-category.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AboutComponent,
    WishesComponent,
    WishInputComponent,
    WishesDisplayComponent,
    WishesCategoryComponent,
    WishComponent,
    WishCategoryDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatIconModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    DragDropModule,
    MatCardModule,
    MatListModule
  ],
  providers: [WishesService],
  bootstrap: [AppComponent],
  entryComponents: [WishesCategoryComponent]
})
export class AppModule { }
