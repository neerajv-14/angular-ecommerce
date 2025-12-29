import { Injectable } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  

  cartItems: CartItem[] = [];

  totalPrice: Subject<number>  = new Subject<number>;
  totalQuantity: Subject<number>  = new Subject<number>;

  constructor(){

  }

  addToCart(cartItem: CartItem){
    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem!: CartItem| undefined;

    if(this.cartItems.length>0){
      // returns first element that passes the test, otherwise returns undefined.s
      
      existingCartItem = this.cartItems.find(item => {
        return item.id ===cartItem.id
      });
    } 

    
    if(existingCartItem!=undefined)alreadyExistsInCart = true;

    if(alreadyExistsInCart){
      // increase quantity for existing cart item
      existingCartItem!.quantity++;
    }
    else{
      // add into array, intially quanity for that quantity is 1.
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    // computing cart price and quantity
    let totalPriceValue:number =0;
    let totalQuantityValue: number =0;

    for(let item of this.cartItems){
      totalPriceValue += item.quantity*item.unitPrice;
      totalQuantityValue += item.quantity;
    }
    
    //publishing the events
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(cartItem: CartItem) {
    // cart Item is copy of reference ( not a copy of direct object). So, we can directly do modification here instead of fetching exact element from array

    // i can't simply do ++ for increment becoz for new item, it needs to be added in cartItems, so use that method directly.
    cartItem.quantity--;
    if(cartItem.quantity==0){
      this.remove(cartItem);
    }
    else{
      this.computeCartTotals();
    }
  }
  remove(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(item => {return item.id ===cartItem.id});
    if(itemIndex> -1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }
  }
}
 

