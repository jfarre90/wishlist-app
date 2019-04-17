import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

//Error handling
import { catchError, map, tap } from 'rxjs/operators';

import { Wish } from './wish';
import { Category } from '../wishes-category/category';

@Injectable({
  providedIn: 'root'
})
export class WishesService {
  
  //Array with all our wishes objects
  wishes: Wish[];
  
  //Array of objects, where each object refers to a category, and all the wishes in the category
  categories: Category[];
  
  //URL when working in development
  // private wishesURL = 'https://angular-wishlist-jfarre.c9users.io:8081/api/wishes';
  
  //URL when deployed
  private wishesURL = 'https://angular-wishlist-server.herokuapp.com/api/wishes';
  
  //If using in local environment, change the url to your localhost and port.

  constructor(private http: HttpClient) { 
    this.getWishes().subscribe(wishes => {
      this.wishes = wishes.sort((a, b) => a.category.localeCompare(b.category));
      this.categories = this.getCategories(this.wishes);
      });
  }
  
  //API CALLS
  getWishes(): Observable<Wish[]>{
    return this.http.get<Wish[]>(this.wishesURL)
      .pipe(
        tap(_ => this.log('fetched wishes')),
        catchError(this.handleError<Wish[]>('getWishes',[]))
      )
  }
  
  getWish(id: number): Observable<Wish> {
    const url = `${this.wishesURL}/${id}`;
    return this.http.get<Wish>(url).pipe(
      tap(_ => this.log(`fetched wish id=${id}`)),
      catchError(this.handleError<Wish>(`getWish id=${id}`))
    )
  }
 
  addWish(wish: Wish){
    return this.http.post<Wish>(this.wishesURL, wish).pipe(
      tap((newWish: Wish) => this.log(`added wish=${newWish.text}`),
      catchError(this.handleError<Wish>('addWish')))
      
    );
  }
  
  deleteWish(wish: Wish): Observable<Wish>{
    const id = wish._id;
    const url = `${this.wishesURL}/${id}`;
    
    return this.http.delete<Wish>(url).pipe(
      tap(_ => this.log(`deleted wish id=${id}`)),
      catchError(this.handleError<Wish>('deleteWish'))
    );
  }
  
  deleteCategory(category: string) {
    const url = `${this.wishesURL}/categories/${category}`;
    return this.http.delete<Wish>(url).pipe(
      tap(_ => this.log(`deleted all wishes from category=${category}`)),
      catchError(this.handleError<Wish>('deleteWish'))
    );
  }
  
  retrieveWishes(){
    return this.wishes;
  }
  
  
  //WISH MANAGEMENT
  
  /*
  
    getCategories() is a function that goes through the wishes array and extracts the unique categories, 
    generating a new Array of objects in the style {title: 'uniqueCategory', wishes: Array of wishes in this category}
     
    Since this function is quite complex, I have added comments in it to make it easier to understand.
  */
  
  getCategories(wishes: Wish[]) {
    // Creating the categories array, which will include duplicates as it iterates through the wishes array
    let categories = wishes.map( wish => {
      
    	let wishCategory= wish['category'];	
      //filteredWishes will return us an array of the wishes that belong to the category in this map loop.
    	let filteredWishes= this.feedCategories(wishes, wishCategory);
    	
    	return {title:wishCategory, wishes: filteredWishes}
    })
	
	  //We are sorting the array so that we can then filter it to only have the unique categories.
  	let sortedCategories = categories.sort((a, b) => a.title.localeCompare(b.title));
  	
  	//We are then returning the filtered array to show unique categories, with all the wishes including that category
    return sortedCategories.filter( (category, index, array) => !index || category.title != array[index-1].title);
  }
  
  
  //Function that given a wish and category, it will return an array of objects, where each object is a wish of the given category
  feedCategories(wishes: Wish[], chosenCategory: string) {
    return wishes.filter(wish => wish['category'] === chosenCategory)
  }
  
  
  
  //ERROR HANDLING
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  private log(message: string) {
    console.log(`What happened: ${message}`);
  }
  
}
