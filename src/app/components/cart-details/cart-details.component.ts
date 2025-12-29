import { Component } from '@angular/core';
import { CartItem } from '../../../common/cart-item';
import { CartServiceService } from '../../services/cart-service.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent {
    cartItems: CartItem[] = [];

    totalPrice: number =0;
    totalQuantity: number =0;

    constructor(private cartService: CartServiceService){

    }

    ngOnInit(): void {
        this.listCartItems();
    }

    listCartItems() {

    // get cart items. when user clicks cart-details, it has all cartItems in that array till that moment
    this.cartItems = this.cartService.cartItems;

      // subscribing to the observables
      // Once you subscribe to an Observable, your subscription 
      // callback runs automatically every time the Observable 
      // emits data — until you unsubscribe or it completes.
      this.cartService.totalPrice.subscribe((data:number)=>{
          this.totalPrice = data;
      });

      this.cartService.totalQuantity.subscribe((data:number)=>{
        this.totalQuantity = data;
      });

      // trigger observable
      this.cartService.computeCartTotals();
    }

    incrementQuantity(cartItem: CartItem){
      this.cartService.addToCart(cartItem);
    }

    decrementQuantity(cartItem: CartItem){
      this.cartService.decrementQuantity(cartItem);
    }

    remove(cartItem: CartItem){
      this.cartService.remove(cartItem);
    }
}
