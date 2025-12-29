import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../common/product';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { CartServiceService } from '../../services/cart-service.service';
import { CartItem } from '../../../common/cart-item';

@Component({
  selector: 'app-product-list',
  imports: [CurrencyPipe,RouterLink,RouterLinkActive,NgbPagination],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

    products: Product [] = [];
    currentCategoryId: number=1;
    prevCategoryId:number=1;
    searchMode!: boolean;
    prevKeyword: string | null= "";

    //properties for pagination
    thePageNumber:number =1;
    thePageSize:number=10;
    theTotalElements:number=0;

    constructor(private productService: ProductService,private activatedRoute: ActivatedRoute,private cartService: CartServiceService){

    }
    
    ngOnInit(){
        
        console.log(this.activatedRoute.url);
        this.activatedRoute.params.subscribe((response:any)=>{
          let hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');

          if(hasCategoryId)this.currentCategoryId = +response.id;
          console.log(this.currentCategoryId);
          this.listProducts();
        })
    }

    listProducts() {
      this.searchMode = this.activatedRoute.snapshot.paramMap.has('keyword');
      if(!this.searchMode)this.handleListProducts();
      else{
        this.handleSearchProducts();
      }
    }

    handleSearchProducts() {
      
      const keyword = this.activatedRoute.snapshot.paramMap.get('keyword');
      // for new search, set page number to 1
      if(this.prevKeyword!=keyword){
        this.thePageNumber=1;
      }
      this.prevKeyword=keyword;

      this.productService.searchProductsPaginate(this.thePageNumber-1,this.thePageSize, keyword).subscribe(this.processResults());
        
    }

    // check if we have a different category than previous as angular will reuse a component if it is currently being viewed.

    // if we have a different category id than previous, set page =1
    handleListProducts(){
      if(this.prevCategoryId!=this.currentCategoryId){
        this.thePageNumber=1;
      }

      this.prevCategoryId=this.currentCategoryId;
      
      //decrementing pagenumber as spring is 0 based, and ng bootstrap is 1 based.
      
      this.productService.getProductListPaginate(this.currentCategoryId,this.thePageNumber-1,this.thePageSize).subscribe(this.processResults());
    }

    updatePageSize(pageSize: string){
      this.thePageSize = +pageSize;
      this.thePageNumber = 1;

      // we need to handle search as well as normal list, So select listProducts()
      this.listProducts(); 

    }

    processResults() {
      return (response: any)=>{
        this.products = response._embedded.products;
        this.thePageNumber = response.page.number+1;
        this.thePageSize = response.page.size;
        this.theTotalElements = response.page.totalElements;
      }
    }

    addToCart(product: Product){
      const cartItem = new CartItem(product);
      this.cartService.addToCart(cartItem);
    }
}


