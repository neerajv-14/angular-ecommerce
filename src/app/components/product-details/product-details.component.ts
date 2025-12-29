import { Component, OnInit } from '@angular/core';
import { Product } from '../../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartServiceService } from '../../services/cart-service.service';
import { CartItem } from '../../../common/cart-item';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe,RouterLink,RouterLinkActive],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product!: Product;


  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,private cartService: CartServiceService){
    
  }

  ngOnInit(){
    
    this.handleProductDetails();
  }

  handleProductDetails() {
    let productId!: number;
    this.activatedRoute.params.subscribe((response:any)=>{
      productId = response.id;
    })
    this.productService.getProductById(productId).subscribe((response:Product)=>{
      this.product = response;
      console.log(this.product);
    })
  }

  addToCart(){
    const cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }


}
