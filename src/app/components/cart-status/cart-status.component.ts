import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-status',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit{

    totalPrice: number =0;
    totalQuantity: number =0;

    constructor(private cartService: CartServiceService){

    }

    ngOnInit(): void {
        this.updateCartItems();
    }

    updateCartItems() {
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
    }


}


